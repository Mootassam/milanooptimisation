import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Records from "../models/records";
import Error405 from "../../errors/Error405";
import Dates from "../utils/Dates";
import Product from "../models/product";
import UserRepository from "./userRepository";
import User from "../models/user";
import Error400 from "../../errors/Error400";
import Commission from "../models/commission";

class RecordRepository {
static async create(data, options: IRepositoryOptions) {
    const { database } = options;
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Execute parallel checks where possible
    await Promise.all([
      this.checkOrder(options),
      this.calculeGrap(data, options)
    ]);

    // Use bulk operations for better performance
    const bulkOps = [
      {
        updateOne: {
          filter: { _id: currentUser.id },
          update: {
            $inc: { tasksDone: 1 },
            $set: { updatedAt: new Date() }
          }
        }
      }
    ];

    const recordData = {
      ...data,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
      date: Dates.getDate(),
      datecreation: Dates.getTimeZoneDate(),
    };

    // Execute in transaction if supported
    const [record] = await Records(database).create([recordData], options);

    await User(database).bulkWrite(bulkOps);

    // Fire and forget audit log - don't block response
    this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    ).catch(error => {
      console.error('Audit log creation failed:', error);
    });

    return this.findById(record.id, options);
  }

  static async calculeGrap(data, options) {
    const { database } = options;
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Parallel database calls
    const [currentProduct, orderCount] = await Promise.all([
      Product(database).findById(data.product).lean(),
      this.CountOrder(options)
    ]);

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    const currentUserBalance = currentUser?.balance || 0;
    const productBalance = currentProduct.amount;
    const currentCommission = currentProduct.commission;
    const mergeDataPosition = currentUser.itemNumber;
    const prizesPosition = currentUser.prizesNumber;
    let total, frozen;

    // Cache user product check
    const hasProduct = currentUser?.product?.id;
    const isPositionMatch = currentUser.tasksDone === (mergeDataPosition - 1);
    const hasPrizes = currentUser?.prizes?.id;
    const isPrizesMatch = currentUser.tasksDone === (prizesPosition - 1);

    if (hasProduct && isPositionMatch) {
      total = Number(currentUserBalance) - Number(productBalance);
      frozen = Number(currentUserBalance);
    } else if (hasPrizes && isPrizesMatch) {
      total = Number(currentUserBalance) + Number(productBalance);
    } else {
      // Find who referred this user and pay commission to them
      await this.payCommissionToReferrer(
        currentUser, 
        productBalance, 
        currentCommission, 
        options
      );

      total = Number(currentUserBalance) + this.calculeTotal(productBalance, currentCommission);
      frozen = 0;
    }

    const updatedValues = {
      balance: total,
      freezeblance: frozen,
      updatedAt: new Date()
    };

    await UserRepository.updateProfileGrap(
      currentUser.id,
      updatedValues,
      options
    );
  }

  /**
   * Find who referred the current user and pay commission based on level
   */
  static async payCommissionToReferrer(currentUser, productBalance, commissionRate, options: IRepositoryOptions) {
    const { database } = options;
    
    // Commission percentages for each level
    const commissionPercentages = {
      1: 0.10, // 10% for Level 1 (Direct referrals)
      2: 0.07, // 7% for Level 2
      3: 0.04, // 4% for Level 3
      4: 0.02  // 2% for Level 4
    };

    try {
      // Find the user who referred the current user
      const referrer = await User(database)
        .findOne({
          refcode: currentUser.invitationcode
        })
        .select('_id username email refcode')
        .lean();

      if (!referrer) {
        console.log('No referrer found for user:', currentUser.email);
        return; // No one referred this user
      }

      // Find what level the current user is in the referrer's tree
      const userLevel = await this.findUserLevelInReferralTree(referrer._id, currentUser.id, options);
      
      if (!userLevel) {
        console.log('User level not found in referrer tree');
        return; // Current user not found in referrer's tree
      }

      const levelPercentage = commissionPercentages[userLevel];
      if (!levelPercentage) {
        console.log('Invalid level found:', userLevel);
        return;
      }

      const taskEarnings = this.calculeTotal(productBalance, commissionRate);
      const commissionAmount = taskEarnings * levelPercentage;

      if (commissionAmount > 0) {
        // Pay commission to the referrer
        await User(database).updateOne(
          { _id: referrer._id },
          {
            $inc: { balance: commissionAmount },
            $set: { updatedAt: new Date() }
          }
        );

        // Create commission record for the REFERRER (not current user)
        await Commission(database).create(
          {
            user: referrer._id, // The person who gets paid
            amount: commissionAmount,
            level: userLevel,
            percentage: levelPercentage * 100,
            fromUser: currentUser.id, // The person who did the task
            fromUserEmail: currentUser.email,
            taskEarnings: taskEarnings,
            tenant: currentUser.tenants?.[0]?.tenant,
          },
          options
        );

        console.log(`Paid $${commissionAmount} to ${referrer.email} (Level ${userLevel}) for task by ${currentUser.email}`);
      }

    } catch (error) {
      console.error('Error in payCommissionToReferrer:', error);
      // Don't throw error to prevent task completion failure
    }
  }

  /**
   * Find what level a user is in someone's referral tree
   */
  static async findUserLevelInReferralTree(rootUserId: string, targetUserId: string, options: IRepositoryOptions): Promise<number | null> {
    const { database } = options;

    try {
      // Get the root user's refcode
      const rootUser = await User(database)
        .findById(rootUserId)
        .select('refcode')
        .lean();

      if (!rootUser) {
        return null;
      }

      // Get the target user to check their invitation chain
      const targetUser = await User(database)
        .findById(targetUserId)
        .select('invitationcode refcode')
        .lean();

      if (!targetUser) {
        return null;
      }

      // If target user was directly referred by root user
      if (targetUser.invitationcode === rootUser.refcode) {
        return 1; // Level 1 - Direct referral
      }

      // Build the referral tree to find the level
      const tree = await this.buildReferralTreeForLevelSearch(rootUserId, options);
      
      if (!tree) {
        return null;
      }

      // Search for the target user in the tree and return their level
      return this.findLevelInTree(tree, targetUser.refcode);

    } catch (error) {
      console.error('Error finding user level:', error);
      return null;
    }
  }

  /**
   * Build a simple referral tree for level searching
   */
  static async buildReferralTreeForLevelSearch(rootUserId: string, options: IRepositoryOptions, maxLevels: number = 4) {
    const { database } = options;
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    try {
      const rootUser = await User(database)
        .findById(rootUserId)
        .select('refcode')
        .lean();

      if (!rootUser) return null;

      const levels: Record<number, any[]> = { 1: [], 2: [], 3: [], 4: [] };

      // Level 1: Direct referrals
      levels[1] = await User(database)
        .find({
          invitationcode: rootUser.refcode,
          tenants: {
            $elemMatch: {
              tenant: currentTenant.id,
              status: 'active'
            }
          }
        })
        .select('refcode invitationcode')
        .lean();

      // Level 2: Referrals of Level 1 users
      if (levels[1].length > 0) {
        const level1RefCodes = levels[1].map((user: any) => user.refcode);
        levels[2] = await User(database)
          .find({
            invitationcode: { $in: level1RefCodes },
            tenants: {
              $elemMatch: {
                tenant: currentTenant.id,
                status: 'active'
              }
            }
          })
          .select('refcode invitationcode')
          .lean();
      }

      // Level 3: Referrals of Level 2 users
      if (levels[2].length > 0) {
        const level2RefCodes = levels[2].map((user: any) => user.refcode);
        levels[3] = await User(database)
          .find({
            invitationcode: { $in: level2RefCodes },
            tenants: {
              $elemMatch: {
                tenant: currentTenant.id,
                status: 'active'
              }
            }
          })
          .select('refcode invitationcode')
          .lean();
      }

      // Level 4: Referrals of Level 3 users
      if (levels[3].length > 0) {
        const level3RefCodes = levels[3].map((user: any) => user.refcode);
        levels[4] = await User(database)
          .find({
            invitationcode: { $in: level3RefCodes },
            tenants: {
              $elemMatch: {
                tenant: currentTenant.id,
                status: 'active'
              }
            }
          })
          .select('refcode invitationcode')
          .lean();
      }

      return {
        root: rootUser,
        levels: levels
      };

    } catch (error) {
      console.error('Error building referral tree for level search:', error);
      return null;
    }
  }

  /**
   * Find what level a user is in the referral tree
   */
  static findLevelInTree(tree: any, targetRefCode: string): number | null {
    for (let level = 1; level <= 4; level++) {
      const levelUsers = tree.levels[level] || [];
      const foundUser = levelUsers.find((user: any) => user.refcode === targetRefCode);
      
      if (foundUser) {
        return level;
      }
    }
    return null; // User not found in the tree
  }

  // Utility functions with validation
  static calculeTotal(price, commission) {
    const numPrice = Number(price);
    const numCommission = Number(commission);

    if (isNaN(numPrice) || isNaN(numCommission)) {
      throw new Error('Invalid price or commission values');
    }

    return (numPrice * numCommission) / 100;
  }

  static calculeTotalMerge(price, commission) {
    const numPrice = Number(price);
    const numCommission = Number(commission);

    if (isNaN(numPrice) || isNaN(numCommission)) {
      throw new Error('Invalid price or commission values');
    }

    return numPrice + (numPrice * numCommission) / 100;
  }

  static async checkOrder(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = Dates.getTimeZoneDate();

    // Use Promise.all for parallel execution
    const [recordCount, userVip] = await Promise.all([
      Records(options.database).countDocuments({
        user: currentUser.id,
        datecreation: currentDate
      }),
      // Get fresh VIP data to ensure accuracy
      User(options.database)
        .findById(currentUser.id)
        .select('vip balance tasksDone')
        .populate('vip')
        .lean()
    ]);

    if (!userVip?.vip) {
      throw new Error400(
        options.language,
        "validation.requiredSubscription"
      );
    }

    const dailyOrder = userVip.vip.dailyorder;

    if (userVip.tasksDone >= dailyOrder) {
      throw new Error400(
        options.language,
        "validation.moretasks"
      );
    }

    if (userVip.balance <= 0) {
      throw new Error400(
        options.language,
        "validation.InsufficientBalance"
      );
    }
  }

  static async CountOrder(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentDate = Dates.getTimeZoneDate();

    const record = await Records(options.database)
      .countDocuments({
        user: currentUser.id,
        datecreation: currentDate
      });

    return { record };
  }

 

  static async tasksDone(currentUser, options) {
    const user = await User(options.database)
      .findById(currentUser)
      .select('tasksDone')
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    return { record: user.tasksDone || 0 };
  }




  static getTimeZoneDate() {
    const serverTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options: Intl.DateTimeFormatOptions = {
      timeZone: serverTimezone,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const currentDate = new Date().toLocaleDateString("en-US", options);

    return currentDate;
  }
  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Records(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Records(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Records(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Records(options.database)
        .findById(id)
        .populate("user")
        .populate("product"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }
      if (filter.product) {
        criteriaAnd.push({
          product: filter.product,
        });
      }

      if (filter.number) {
        criteriaAnd.push({
          number: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.number),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.status),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    const count = await Records(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
      user: currentUser.id,
    });

    if (filter) {


      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }
      if (filter.product) {
        criteriaAnd.push({
          product: filter.product,
        });
      }

      if (filter.number) {
        criteriaAnd.push({
          number: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.number),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          status: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.status),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let listitems = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("user")
      .populate("product");

    let rows = await Records(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("product");

    const count = await Records(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    let total = 0;

    listitems.map((item) => {
      let data = item.product;
      let itemTotal =
        (parseFloat(data.commission) * parseFloat(data.amount)) / 100;

      total += itemTotal;
    });
    total = parseFloat(total.toFixed(3));

    return { rows, count, total };
  }

  static async findAndCountPerDay(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
      user: currentUser.id,
    });

    criteriaAnd.push({
      status: {
        $regex: MongooseQueryUtils.escapeRegExp("completed"),
        $options: "i",
      },
    });

    const start = new Date();
    start.setHours(0, 0, 0, 0); // Set to the start of the current day
    const end = new Date();
    end.setHours(23, 59, 59, 999); // Set to the end of the current day
    criteriaAnd.push({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let listitems = await Records(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("user")
      .populate("product");

    // let rows = await Records(options.database)
    //   .find(criteria)
    //   .limit(limitEscaped)
    //   .sort(sort)
    //   .populate("user")
    //   .populate("product");

    // const count = await Records(options.database).countDocuments(criteria);

    // rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    let total = 0;

    listitems.map((item) => {
      let data = item.product;
      let itemTotal =
        (parseFloat(data.commission) * parseFloat(data.amount)) / 100;

      total += itemTotal;
    });
    total = parseFloat(total.toFixed(3));

    return { total };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            titre: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Records(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.titre,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Records(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options
    );
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }
    const output = record.toObject ? record.toObject() : record;
    output.product.photo = await FileRepository.fillDownloadUrl(
      output?.product?.photo
    );

    return output;
  }
}

export default RecordRepository;

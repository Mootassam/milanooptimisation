import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import Error400 from "../../errors/Error400";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Withdraw from "../models/withdraw";
import withdraw from "../models/withdraw";
import transaction from "../models/transaction";
import TransactionRepository from "./TransactionRepository";
import { sendNotification } from "../../services/notificationServices";


class WithdrawRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);
    const session = await MongooseRepository.createSession(options.database);

    try {
      // Start transaction
      const User = options.database.model('user');

      // Check if user has sufficient balance
      const user = await User.findById(currentUser.id).session(session);
      const withdrawalAmount = parseFloat(data.amount);

      if (user.balance < withdrawalAmount) {
        throw new Error400(
          options.language,
          "withdraw.insufficientBalance"
        );
      }

      data = {
        referenceNumber: new Date().getTime() + data.walletAddress, // Fixed: better reference number
        status: data.status || 'pending', // Default to pending if not provided
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        user: currentUser.id,
        paymentDetails: {
          ...(data.paymentMethod === 'crypto' && {
            crypto: {
              currency: 'USDT',
              walletAddress: data.walletAddress,
              network: 'TRC20',
            },
          }),
          ...(data.paymentMethod === 'mobile_money' && {
            mobileMoney: {
              provider: data.mobileProvider,
              phoneNumber: data.phoneNumber,
              depositId: data.depositId,
            },
          }),
        },
      };

      // Deduct amount from user balance immediately

      // Create withdrawal record
      const [record] = await Withdraw(options.database).create(
        [
          {
            ...data,
            tenant: currentTenant.id,
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
          },
        ],
        { ...options, session }
      );

      await sendNotification({
        user: record.user.id,
        transaction: record.id,
        type: 'withdraw_success',
        forAdmin : true,
        amount: record.amount,
        options: { ...options, session }
      });
      await User.findByIdAndUpdate(
        currentUser.id,
        { $inc: { balance: -withdrawalAmount } },
        { session }
      );


      await TransactionRepository.create
        (data, record.id, 'withdraw', options)

      // Create audit log
      await this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        data,
        { ...options, session }
      );

      // Commit transaction
      await MongooseRepository.commitTransaction(session);

      return this.findById(record.id, options);

    } catch (error) {
      // Rollback transaction on error
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }


  static async withdrawPending(options: IRepositoryOptions) {
    const count = await withdraw(options.database).countDocuments({
      status: "pending"
    });
    return {count : count};
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Withdraw(options.database).updateOne(
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
      Withdraw(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Withdraw(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }




  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database).findById(id).populate("user"),
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

      if (filter.amount) {
        criteriaAnd.push({
          amount: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.amount),
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

      if (filter.type) {
        criteriaAnd.push({
          type: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.type),
            $options: "i",
          },
        });
      }

      if (filter.dateWithdraw) {
        const [start, end] = filter.dateWithdraw;

        if (start !== undefined && start !== null && start !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Withdraw(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user");

    const count = await Withdraw(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountByUser(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];

    const search = filter

    criteriaAnd.push({
      tenant: currentTenant.id,
      user: currentUser.id,
    });

    if (search) {
      if (search.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }
      if (search.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }

      if (search.amount) {
        criteriaAnd.push({
          amount: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.amount),
            $options: "i",
          },
        });
      }

      if (search.status) {
        criteriaAnd.push({
          status: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.status),
            $options: "i",
          },
        });
      }

      if (search.type) {
        criteriaAnd.push({
          type: {
            $regex: MongooseQueryUtils.escapeRegExp(search.type),
            $options: "i",
          },
        });
      }

      if (search.dateWithdraw) {
        const [start, end] = search.dateWithdraw;

        if (start !== undefined && start !== null && start !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Withdraw(options.database)
      .find(criteria)
      // .skip(skip)
      // .limit(limitEscaped)
      .sort(sort)
      .populate("user");

    const count = await Withdraw(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
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

    const records = await Withdraw(options.database)
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
        entityName: Withdraw(options.database).modelName,
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
    output.photo = await FileRepository.fillDownloadUrl(output.photo);

    return output;
  }
}

export default WithdrawRepository;


import axios from "axios";
import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Deposit from "../models/deposit";
import Company from "../models/company";
import TransactionRepository from "./TransactionRepository";
import WithdrawService from "../../services/withdrawService";
import Notification from "../models/notification";
import user from "../models/user";
import { sendNotification } from "../../services/notificationServices";

class DepositRepository {
static async create(data, options: IRepositoryOptions) {
  console.log(data);

  let items;
  if (data.paymentMethod === 'crypto') {
    // Check for duplicate TXID before processing
    await this.checkDuplicateTxid(data.txid, options);
    items = await this.tronScan(data, options);
  }

  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);

  data = {
    status: data.paymentMethod === 'crypto' ? items.confirmed ? 'success' : 'pending' : data.status,
    amount: data.paymentMethod === 'crypto' ? items.amount : data.amount,
    paymentMethod: data.paymentMethod,
    user: currentUser.id,
    paymentDetails: {
      ...(data.paymentMethod === 'crypto' && {
        crypto: {
          currency: 'USDT',
          walletAddress: items.sender,
          txid: items.txid,
          network: items.contract_type.toUpperCase(),
        },
      }),
      ...(data.paymentMethod === 'mobile_money' && {
        mobileMoney: {
          provider: data.mobileProvider,
          phoneNumber: data.phoneNumber,
        },
      }),
    },
  };

  const [record] = await Deposit(options.database).create(
    [
      {
        ...data,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      },
    ],
    options
  );

  await user(options.database).findByIdAndUpdate(
    { _id: currentUser.id }, 
    { $inc: { balance: parseFloat(record.amount) } }
  );

  await TransactionRepository.create(data, record.id, 'deposit', options);
  
  const session = await MongooseRepository.createSession(options.database);

  await sendNotification({
    user: record.user,
    transaction: record._id,
    type: 'deposit_success',
    amount: record.amount,
    options: { ...options, session }
  });

  await this._createAuditLog(
    AuditLogRepository.CREATE,
    record.id,
    data,
    options
  );

  this.findById(record.id, options);
  return items;
}

static async checkDuplicateTxid(txid: string, options: IRepositoryOptions) {
  if (!txid) {
    return; // No TXID provided, skip duplicate check
  }

  // Check if a deposit with this TXID already exists
  const existingDeposit = await Deposit(options.database)
    .findOne({
      'paymentDetails.crypto.txid': txid,
      tenant: MongooseRepository.getCurrentTenant(options).id,
    })
    .lean();

  if (existingDeposit) {
    throw new Error(`Transaction ID ${txid} has already been used for another deposit. Please use a unique transaction ID.`);
  }
}

static async tronScan(data, options: IRepositoryOptions) {
  const { txid, amount } = data;
  const currentWalllet = await Company(options.database).findOne().select('trc20').lean();
  if (!currentWalllet) {
    throw new Error("Company wallet not found");
  }
  if (!txid || !amount) {
    throw new Error("TXID and amount are required");
  }

  const expectedAddress = currentWalllet.trc20;

  try {
    const url = `https://apilist.tronscanapi.com/api/transaction-info?hash=${txid}`;
    const response = await axios.get(url);
    const transactionData = response.data;

    if (!transactionData || !transactionData.contractData) {
      throw new Error("Invalid TXID or not found on blockchain.");
    }

    const {
      contractData,
      confirmed,
      contractRet,
      trigger_info,
      tokenTransferInfo,
      contract_type
    } = transactionData;

    if (contract_type !== "trc20") {
      throw new Error("Not a TRC20 transaction.");
    }

    if (!confirmed || contractRet !== "SUCCESS") {
      throw new Error("Transaction not confirmed or failed.");
    }

    const receiver = tokenTransferInfo.to_address;
    const sender = contractData.owner_address;
    const walletAmount = parseFloat(trigger_info?.parameter?._value) / 1000000;

    if (receiver !== expectedAddress) {
      throw new Error("Receiver address mismatch.");
    }

    const amountTolerance = 0.000001;
    if (Math.abs(walletAmount - parseFloat(amount)) > amountTolerance) {
      throw new Error("Deposit amount does not match the transaction amount.");
    }

    return {
      txid,
      sender,
      receiver,
      amount: walletAmount,
      confirmed,
      contract_type
    };
  } catch (error: any) {
    console.error("Error verifying TRC20 TX:", error.message);
    throw error;
  }
}


  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Deposit(options.database).updateOne(
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
      Deposit(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Deposit(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }




  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).findById(id).populate("user"),
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

      if (filter.dateDeposit) {
        const [start, end] = filter.dateDeposit;

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

    let rows = await Deposit(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user");

    const count = await Deposit(options.database).countDocuments(criteria);

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

      if (search.dateDeposit) {
        const [start, end] = search.dateDeposit;

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

    let rows = await Deposit(options.database)
      .find(criteria)
      // .skip(skip)
      // .limit(limitEscaped)
      .sort(sort)
      .populate("user");

    const count = await Deposit(options.database).countDocuments(criteria);

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

    const records = await Deposit(options.database)
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
        entityName: Deposit(options.database).modelName,
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

export default DepositRepository;

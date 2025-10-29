import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import WithdrawRepository from "../database/repositories/withdrawRepository";
import Notification from "../database/models/notification";
import withdraw from "../database/models/withdraw";
import TransactionRepository from "../database/repositories/TransactionRepository";
import { sendNotification } from "./notificationServices";

export default class WithdrawService {
  options: IServiceOptions;

  constructor(options) {

    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await WithdrawRepository.create(data, {
        ...this.options,
        session,
      });
      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async updateUserBalance(userId, amount, session, operation = 'inc') {
    const User = this.options.database.model('user');
    const update = operation === 'inc'
      ? { $inc: { balance: parseFloat(amount) } }
      : { $inc: { balance: -parseFloat(amount) } };

    await User.findByIdAndUpdate(userId, update, { session });
  }



  async checkSolde(data, options) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    if (!data) {
      throw new Error400(options.language, "validation.requiredAmount");
    }
    const amount = data.amount;
    const type = data.type;

    if (type === "withdraw") {



      if (!currentUser.trc20) {

        throw new Error400(options.language, "validation.missingWalletAddress");

      }


      if (currentUser.withdrawPassword == data.withdrawPassword) {
        if (currentUser.balance < amount) {

          throw new Error400(options.language, "validation.exceedsBalance");

        }
      } else {

        throw new Error400(options.language, "validation.inValidWithdrawPassword");

      }
    }
  }

  async updateTransactionStatus(transactionId, newStatus, options) {
    const session = await MongooseRepository.createSession(this.options.database);

    try {
      const User = this.options.database.model('user');
      const Withdraw = this.options.database.model('withdraw');
      const Transaction = this.options.database.model('transaction'); // Add Transaction model

      const transaction = await Withdraw.findById(transactionId)
        .populate('user')
        .session(session);

      if (!transaction) {
        throw new Error400(this.options.language, "Transaction.notFoundTransaction");
      }

      const oldStatus = transaction.status;
      const amount = parseFloat(transaction.amount);

      // Update the withdraw transaction
      const updatedTransaction = await Withdraw.findByIdAndUpdate(
        transactionId,
        {
          $set: {
            status: newStatus,
            updatedBy: MongooseRepository.getCurrentUser(options).id
          }
        },
        { new: true, session }
      );

      // Update the related transaction model using referenceNumber
      const updatedMainTransaction = await Transaction.findOneAndUpdate(
        { referenceNumber: transactionId.toString() }, // Convert to string to match
        {
          $set: {
            status: newStatus,
            updatedBy: MongooseRepository.getCurrentUser(options).id
          }
        },
        { new: true, session }
      );

      // Optional: Log if transaction record is not found
      if (!updatedMainTransaction) {
        console.warn(`No transaction found with referenceNumber: ${transactionId}`);
      }

      // Create notifications based on status
      if (newStatus === 'success') {


        await sendNotification({
          user: transaction.user._id,
          transaction: transactionId,
          type: 'withdraw_success',
          amount: transaction.amount,
          options: { ...options, session }
        });

      } else if (newStatus === 'canceled') {


        await sendNotification({
          user: transaction.user._id,
          transaction: transactionId,
          type: 'withdraw_canceled',
          amount: transaction.amount,
          options: { ...options, session }
        });
      }

      // Adjust user balance based on status changes
      if (newStatus === 'canceled') {
        await User.findByIdAndUpdate(
          transaction.user._id,
          { $inc: { balance: amount } },
          { session }
        );
      } else if (oldStatus === 'canceled' && newStatus === 'success') {
        await User.findByIdAndUpdate(
          transaction.user._id,
          { $inc: { balance: -amount } },
          { session }
        );
      }

      await MongooseRepository.commitTransaction(session);
      return updatedTransaction;

    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }


  async checkpermission(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    if (currentUser.withdraw) return;

    throw new Error400(
      this.options.language,
      "validation.permissoin"
    );
  }


  async withdrawPending(options) {
    return await WithdrawRepository.withdrawPending(options)
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await WithdrawRepository.update(id, data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      for (const id of ids) {
        await WithdrawRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return WithdrawRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return WithdrawRepository.findAllAutocomplete(
      search,
      limit,
      this.options
    );
  }

  async findAndCountAll(args) {
    return WithdrawRepository.findAndCountAll(args, this.options);
  }

  async withdraw(data) {
    console.log("🚀 ~ WithdrawService ~ withdraw ~ data:", data)
    // return WithdrawRepository.withdraw(data, this.options);
  }

  async findAndCountByUser(args) {
    return WithdrawRepository.findAndCountByUser(args, this.options);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashRequired"
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashExistent"
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await WithdrawRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
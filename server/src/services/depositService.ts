import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import DepositRepository from "../database/repositories/depositRepository";
import Notification from "../database/models/notification";
import { sendNotification } from "./notificationServices";

export default class DepositService {
  options: IServiceOptions;

  constructor(options) {

    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {

      const record = await DepositRepository.create(data, {
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
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const Transaction = this.options.database.model('transaction');
      const User = this.options.database.model('user');

      // Find the transaction with user data
      const transaction = await Transaction.findById(transactionId)
        .populate('user')
        .session(session);

      if (!transaction) {
        throw new Error400(
          this.options.language,
          "Transaction.notFoundTransaction"
        );
      }

      const oldStatus = transaction.status;
      const amount = parseFloat(transaction.amount);

      // Update transaction status
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          status: newStatus,
          updatedBy: MongooseRepository.getCurrentUser(options).id
        },
        { new: true, session }
      );

      // Create notification based on transaction type and new status
      if (transaction.type === 'withdraw' && newStatus === 'success') {
        // Only create withdraw_success notification for successful withdrawals


        await sendNotification({
          user: transaction.user._id,
          transaction: transactionId,
          type: 'withdraw_success',
          amount: transaction.amount,
          options: { ...options, session }
        });
      } else if (transaction.type === 'withdraw' && newStatus === 'canceled') {
        // Create withdraw_canceled notification for canceled withdrawals


        await sendNotification({
          user: transaction.user._id,
          transaction: transactionId,
          type: 'withdraw_canceled',
          amount: transaction.amount,
          options: { ...options, session }
        });
      } else if (transaction.type === 'deposit' && newStatus === 'canceled') {
        // Create deposit_canceled notification for canceled deposits

        await sendNotification({
          user: transaction.user._id,
          transaction: transactionId,
          type: 'deposit_canceled',
          amount: transaction.amount,
          options: { ...options, session }
        });

      }
      // Note: deposit_success is already created in the create method

      // Handle withdrawal transactions - only return money if canceled
      if (transaction.type === 'withdraw') {
        // Case: Status changed to 'canceled' - return the amount
        if (newStatus === 'canceled') {
          await User.findByIdAndUpdate(
            transaction.user._id,
            { $inc: { balance: amount } },
            { session }
          );
        }

        // Case: Status changed from 'canceled' to 'success' - deduct again
        else if (oldStatus === 'canceled' && newStatus === 'success') {
          await User.findByIdAndUpdate(
            transaction.user._id,
            { $inc: { balance: -amount } },
            { session }
          );
        }
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

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await DepositRepository.update(id, data, {
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
        await DepositRepository.destroy(id, {
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
    return DepositRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return DepositRepository.findAllAutocomplete(
      search,
      limit,
      this.options
    );
  }

  async findAndCountAll(args) {
    return DepositRepository.findAndCountAll(args, this.options);
  }

  async findAndCountByUser(args) {
    return DepositRepository.findAndCountByUser(args, this.options);
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
    const count = await DepositRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
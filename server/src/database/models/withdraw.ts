
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("withdraw");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const WithdrawSchema = new Schema(
    {
      // Additional fields for tracking
      referenceNumber: {
        type: String,
        unique: true,
      },
      // Basic withdraw information
      status: {
        type: String,
        enum: ["pending", "canceled", "completed", "failed"],
        default: "pending",
      },
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "USD",
      },

      // Payment method information
      paymentMethod: {
        type: String,
        enum: ["crypto", "mobile_money"],
        required: true,
      },

      // Specific payment method details
      paymentDetails: {
        // For Crypto withdrawals
        crypto: {
          currency: {
            type: String,
            enum: ["USDT", "BTC", "ETH"],
          },
          walletAddress: {
            type: String,
          },
          txid: {
            type: String,
          },
          network: {
            type: String,
            enum: ["TRC20", "ERC20", "BEP20"],
            default: "TRC20"
          }
        },

        // For Mobile Money withdrawals
        mobileMoney: {
          provider: {
            type: String,
            enum: ["mtn", "airtel", "telecel", "orange"],
          },
          phoneNumber: {
            type: String,
          },
          withdrawId: {
            type: String,
          }
        }
      },

      // User and tenant information
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      // Audit fields
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      importHash: { type: String },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  WithdrawSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  WithdrawSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WithdrawSchema.set("toJSON", {
    getters: true,
  });

  WithdrawSchema.set("toObject", {
    getters: true,
  });

  return database.model("withdraw", WithdrawSchema);
};

import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("deposit");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DepositSchema = new Schema(
    {

      // Additional fields for tracking
      referenceNumber: {
        type: String,
        unique: true,
      },
      // Basic deposit information
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
        // For Crypto deposits
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

        // For Mobile Money deposits
        mobileMoney: {
          provider: {
            type: String,
            enum: ["mtn", "airtel", "telecel", "orange"],
          },
          phoneNumber: {
            type: String,
          },
          depositId: {
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

  DepositSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  DepositSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DepositSchema.set("toJSON", {
    getters: true,
  });

  DepositSchema.set("toObject", {
    getters: true,
  });

  return database.model("deposit", DepositSchema);
};

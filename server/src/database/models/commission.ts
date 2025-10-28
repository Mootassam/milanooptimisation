import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("commission");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CommissionSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      level: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4],
      },
      percentage: {
        type: Number,
        required: true,
      },
      fromUser: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      fromUserEmail: {
        type: String,
      },
      taskEarnings: {
        type: Number,
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
    {
      timestamps: true,
    }
  );

  CommissionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  CommissionSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CommissionSchema.set("toJSON", {
    getters: true,
  });

  CommissionSchema.set("toObject", {
    getters: true,
  });

  return database.model("commission", CommissionSchema);
};

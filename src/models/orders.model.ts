import mongoose from "mongoose";
import UserModel from "./users.model";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    grandTotal: {
        type: Number,
        required: true,
    },
    orderItems: [{
      name: {
          type: String,
          required: true,
      },
      productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
      },
      price: {
          type: Number,
          required: true,
      },
      quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less than 1"],
          max: [5, "Quantity can not be more than 5"]
      },
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },
  },
  {
    timestamps: true,
  }
);


const OrdersModel = mongoose.model("Orders", OrderSchema);

export default OrdersModel;
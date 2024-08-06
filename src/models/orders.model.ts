import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    grandTotal: {
        type: String,
        unique: true,
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
          type: [String],
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
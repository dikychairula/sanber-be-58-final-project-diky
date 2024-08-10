import mongoose from "mongoose";
import UserModel from "./users.model";
import mail from "../utils/mail"

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


OrderSchema.post("save", async function (doc, next) {
  const order = doc;
  const user = await UserModel.findById(order.createdBy);

  if (!user) {
    console.log("User does not exist");
    return;
  }

  const content = await mail.render("order-success.ejs", {
    customerName: user.fullName,
    grandTotal: order.grandTotal,
    orderItems: order.orderItems,
    contactEmail: "tosayagroup@gmail.com",
    companyName: "Tosaya (Toko Sagala Aya)",
    year: 2024,
  });

  await mail.send({
    to: user.email,
    subject: "Tosaya Invoice",
    content: content,
  });

  next();
});

const OrdersModel = mongoose.model("Orders", OrderSchema);

export default OrdersModel;

/* Variabel invoice */

// customerName 
// item.name
// item.quantity
// item.price
// contactEmail
// companyName
// year
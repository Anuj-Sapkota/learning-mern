import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: [true, "Order number is required!"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required!"],
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required"],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  status: {
    type: String,
    default: "",
    enum: [],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
  },
  shippingAddress: {
    city: {
      type: String,
      required: [true, "Shipping address city is required."],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Shipping address province is required."],
    },
    street: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

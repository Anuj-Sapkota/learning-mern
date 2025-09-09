import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required!"],
  },
  method: {
    type: String,
    required: [true, "Payment method is required!"],
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "failed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionIt: String,
});

const model = mongoose.model("Payment", paymentSchema);

export default model;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "Price must be a positive number."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  stock: {
    type: Number,
    max: [1000, "Stock limit reached! Cannot exceed 1000 stocks."],
  },
  imageUrls: {
    type: [String],
  },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;

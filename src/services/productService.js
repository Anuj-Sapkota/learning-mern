import fs from "fs";
import productModel from "../models/Product.js";
const rawData = fs.readFileSync("./src/data/products.json", "utf8");
const products = JSON.parse(rawData);
const getProduct = async () => {
  const getProduct = await productModel.find();
  return getProduct;
};

const createProduct = async (data, createdBy) => {
  const createdData = await productModel.create({
    ...data,
    createdBy
  });
  return createdData;
};
const getProductById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};
const updateProduct = async (id, data) => {
  const updatedData = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedData;
};
const deleteProduct = async (id) => {
  const deletedData = await productModel.findByIdAndDelete(id);
  return deletedData;
};
export default {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

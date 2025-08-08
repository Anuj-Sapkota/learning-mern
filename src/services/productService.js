import productModel from "../models/Product.js";

const getProduct = async (query) => {
  const sort = JSON.parse(query.sort || "{}");
  const { limit, offset, brands, category, min, max, name } = query;
  const filters = {};

  if (brands) {
    const brandItems = brands.split(",");
    filters.brand = { $in: brandItems };
  }
  if (category) filters.category = category;
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (name) filters.name = { $regex: name, $options: "i"}
  const getProduct = await productModel
    .find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);
  return getProduct;
};

const createProduct = async (data, createdBy) => {
  const createdData = await productModel.create({
    ...data,
    createdBy,
  });
  return createdData;
};
const getProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) throw { statusCode: 404, message: "Product not found." };
  return product;
};
const updateProduct = async (id, data, userId) => {
  const product = await getProductById(id);

  if (product.createdBy.toString() !== userId.toString()) {
    throw { statusCode: 403, message: "Access Denied." };
  }

  const updatedData = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedData;
};
const deleteProduct = async (id, userId) => {
  const product = await getProductById(id);

  if (product.createdBy.toString() !== userId.toString()) {
    throw { statusCode: 403, message: "Access Denied." };
  }

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

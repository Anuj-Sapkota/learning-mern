import productService from "../services/productService.js";

const getProduct = async (req, res) => {
  try {
    const products = await productService.getProduct(req.query);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productService.createProduct(
      req.body,
      req.user._id
    );
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body,
      req.user._id
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id, req.user._id);
    res.send(`Product with id ${req.params.id} was deleted successfully.`);
  } catch (error) {
    console.log(error.message);
    res.status(error.statusCode).send(error.message);
  }
};
export default {
  getProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};

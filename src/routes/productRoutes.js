import express from "express";
import productController from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/rolebasedAuth.js";
import { MERCHANT } from "../constants/roles.js";
const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post(
  "/",
  auth,
  roleBasedAuth(MERCHANT),
  productController.createProduct
);

router.put(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT),
  productController.updateProduct
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT),
  productController.deleteProduct
);

export default router;

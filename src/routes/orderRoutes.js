import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/rolebasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", roleBasedAuth(ADMIN), orderController.getOrders);

// URL: /api/orders/user
router.get("/user", orderController.getOrdersByUser);

router.get("/:id", roleBasedAuth(ADMIN), orderController.getOrderById);

router.post("/", orderController.createOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

router.post("/:id/payment", orderController.orderPayment);

export default router;

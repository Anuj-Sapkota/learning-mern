import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/rolebasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", auth, roleBasedAuth(ADMIN), orderController.getOrders);

router.post("/", auth, orderController.createOrder);

router.delete("/:id", auth, roleBasedAuth(ADMIN), orderController.deleteOrder);

export default router;

import orderModel from "../models/Order.js";
import payment from "../utils/payment.js";
import crypto from "crypto";
const getOrders = async () => {
  const orders = await orderModel
    .find()
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"]);
  return orders;
};

const createOrder = async (data, user) => {
  const orderNumber = crypto.randomUUID();
  const createdOrder = await orderModel.create({
    ...data,
    user,
    orderNumber,
  });
  return createdOrder;
};

const getOrderById = async (id) => {
  console.log(id)
  const order = await orderModel
    .findById(id)
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"]);
console.log(order);
  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  return order;
};
const getOrdersByUser = async (userId) => {
  const orders = await orderModel
    .find({ user: userId })
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  return orders;
};
const deleteOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (order.user._id != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  return await orderModel.findByIdAndDelete(id);
};

const orderPayment = async (id, data) => {
  const order = await getOrderById(id);
return await payment.payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.id,
    purchaseOrderName: order.orderNumber,
    customer: order.user,
  });};

export default {
  getOrders,
  createOrder,
  deleteOrder,
  orderPayment,
  getOrdersByUser,
};

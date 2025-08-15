import orderModel from "../models/Order.js";

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
  const order = await orderModel.findById(id)
    .populate("orderItems.product")
    .populate("user", ["name", "email", "phone", "address"])
    .populate("payment");

  if (!order) {
    throw {
      statusCode: 404,
      message: "Order not found.",
    };
  }

  return order;
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
export default { getOrders, createOrder, deleteOrder };

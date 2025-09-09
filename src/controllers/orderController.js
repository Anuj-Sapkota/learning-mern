import orderService from "../services/orderService.js";

const getOrders = async (req, res) => {
  try {
    const data = await orderService.getOrders();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getOrderById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersByUser(req.user._id);

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createOrder = async (req, res) => {
  const input = req.body;
  if (!input.orderItems || !input.orderItems.length) {
    return res.status(400).send("Order items are required!");
  }
  try {
    const data = await orderService.createOrder(req.body, req.user);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id, req.user);

    res.send("Order deleted successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateOrder = async (id, data, user) => {
  const order = await getOrderById(id);

  if (order.user._id != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  return await Order.findByIdAndUpdate(
    id,
    {
      status: data.status,
    },
    { new: true }
  );
};
const orderPayment = async (req, res) => {
  const input = req.body;
  const id = req.params.id;
  try {
    const data = await orderService.orderPayment(id, input);
    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};
export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  orderPayment,
  getOrdersByUser,
};

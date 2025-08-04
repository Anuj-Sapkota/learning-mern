import User from "../models/User.js";

const createUser = async (data) => {
  return await User.create(data);
};
const getUser = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};
const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
export default {createUser, getUser, getUserById, updateUser, deleteUser};

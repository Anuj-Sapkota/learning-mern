import userService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const createdUser = await userService.createUser(req.body);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getUser = async (req, res) => {
  const gotUser = await userService.getUser();
  res.status(200).json(gotUser);
};

const getUserById = async (req, res) => {
  const gotUserById = await userService.getUserById(req.params.id);
  res.status(200).json(gotUserById);
};
const updateUser = async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(201).json(updatedUser);
};
const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(201).send("User delete successfully.");
};
export default { createUser, getUser, getUserById, updateUser, deleteUser };

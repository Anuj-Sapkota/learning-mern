import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";

const login = async (data) => {
  const user = await UserModel.findOne({ email: data.email });
  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!user || !isPasswordMatch)
    throw {
      message: "Incorrect email or password.",
    };
  if (!data.email || !data.password)
    throw {
      message: "Please fill both email and password.",
    };
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};
const register = async (data) => {
  const userData = await UserModel.findOne({ email: data.email });
  if (userData)
    throw {
      message: "User already exists!",
    };

  const hashedPassword = bcrypt.hashSync(data.password);

  const user = await UserModel.create({
    ...data,
    password: hashedPassword,
  });
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};
export default { register, login };

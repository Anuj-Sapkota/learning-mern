import authService from "../services/authService.js";
import { createJwt, verifyJwt } from "../utils/jwt.js";

const loginUser = async (req, res) => {
  try {
    const input = req.body;
    const loggedInUser = await authService.login(input);

    const authToken = createJwt(loggedInUser);
    res.cookie("authToken", authToken, {maxAge: 86400 * 1000});

    return res.status(201).json(loggedInUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const registerUser = async (req, res) => {
  try {
    const input = req.body;

    if (!input.confirmPassword) {
      return res.status(400).send("Confirm Password is required!");
    }
    if (input.password !== input.confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }
    const registeredUser = await authService.register(input);
        const authToken = createJwt(registeredUser);
    res.cookie("authToken", authToken, {maxAge: 86400 * 1000});

    res.status(201).json(registeredUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { registerUser, loginUser };

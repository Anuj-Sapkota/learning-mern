import mongoose from "mongoose";
import { ADMIN, MERCHANT, USER } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty."],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: [true, "Email already used."],
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [6, "Password length must be greater than 6."],
  },
  role: {
    type: [String],
    default: [USER],
    enum: [USER, ADMIN, MERCHANT],
  },
  address: {
    city: {
      type: String,
      required: [true, "Shipping address city is required."],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "Shipping address province is required."],
    },
    street: {
      type: String,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("User", userSchema);
export default model;

import bodyParser from "body-parser";
import express from "express";
import multer from "multer";

import config from "./config/config.js";
import productRouter from "./routes/productRoutes.js";
import databaseConfig from "./config/databaseConfig.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import { ADMIN } from "./constants/roles.js";
import auth from "./middlewares/auth.js";
import roleBasedAuth from "./middlewares/rolebasedAuth.js";
import orderRouter from "./routes/orderRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

databaseConfig();
connectCloudinary();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
  });
});

app.use("/api/products", upload.array("images", 4), productRouter);
app.use("/api/user", auth, roleBasedAuth(ADMIN), userRouter);
app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);

app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});

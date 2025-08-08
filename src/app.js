import bodyParser from "body-parser";
import express from "express";
import config from "./config/config.js";
import productRouter from "./routes/productRoutes.js";
import databaseConfig from "./config/databaseConfig.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import { ADMIN } from "./constants/roles.js";
import auth from "./middlewares/auth.js";
import roleBasedAuth from "./middlewares/rolebasedAuth.js";

const app = express();

databaseConfig();

app.use(bodyParser.json());
app.use(logger);
app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
  });
});

app.use("/api/products", productRouter);
app.use("/api/user",auth, roleBasedAuth(ADMIN), userRouter);
app.use("/api/auth", authRouter);

app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});

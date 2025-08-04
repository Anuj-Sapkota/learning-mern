import mongoose from "mongoose";
import config from "./config.js";
async function databaseConfig() {
  try {
    const status = await mongoose.connect(config.connectionString);
    console.log(
      `Database Connected Successfully at port: ${status.connection.port}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default databaseConfig;

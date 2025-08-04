import dotenv from "dotenv"

dotenv.config()

const config = {
    name: process.env.NAME || "",
    port: process.env.PORT || 6000,
    version: process.env.VERSION || "0.0.1",
    connectionString: process.env.CONNECTION_STRING || "",
    jwtSecret: process.env.JWT_SECRET || ""
}
export default config;
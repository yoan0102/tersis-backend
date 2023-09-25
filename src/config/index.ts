import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
};

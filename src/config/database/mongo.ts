import mongoose from "mongoose";
import config from "../index";
export default async function connectDB() {
  try {
    if (config.mongoUri) {
      const mongo = await mongoose.connect(config.mongoUri);
      console.log(`Server DB running on PORT ${mongo.connection.port}`);
    } else {
      console.log(`Should config mongodb uri in file .env`);
    }
  } catch (error) {
    console.log(error);
    console.log(`Error connect db`);
  }
}

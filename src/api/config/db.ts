import { MONGO_DB_URL } from "../constants/global";
import mongoose from "mongoose";

export const db = () => {
  try {
    mongoose.connect(MONGO_DB_URL);
  } catch (e) {
    console.error(`Db connection error: ${e}`);
    process.exit(1);
  }

  mongoose.connection.once("open", () => {
    console.log("db connected");
  });

  mongoose.connection.on("error", (e) => {
    console.error(`Db error: ${e}`);
  });

  return;
};

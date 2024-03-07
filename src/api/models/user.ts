import mongoose from "mongoose";

/**
 * User Model
 * Primary Goal: Creates a mongoDB model for user
 */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);

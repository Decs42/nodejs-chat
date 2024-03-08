import mongoose from "mongoose";

/**
 * Message Model
 * Primary Goal: Creates a mongoDB model for message
 */

const MessageSchema = new mongoose.Schema(
  {
    sender: {type : mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {type: String, required: true},
    username:{type: String, required: true},
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", MessageSchema);

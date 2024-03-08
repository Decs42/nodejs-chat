import { Message } from "../models/types/message";
import { MessageModel } from "../models/message";

/**
 * Message Utils
 * Primary Goal: creates a message based on the message and sender
 */

export const createMessage = async (data: Message) => {
  return await MessageModel.create(data);
};

/**
 * Message Utils
 * Primary Goal: Gets all messages that have been sent previously
 */

export const getMessageHistory = async () => {
  return await MessageModel.find({});
};

/**
 * Message Utils
 * Primary Goal: Deletes a message from the db
 */

export const deleteMessage = async (id: string) => {
  return await MessageModel.deleteOne({ _id: id });
};

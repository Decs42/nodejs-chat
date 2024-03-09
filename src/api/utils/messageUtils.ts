import WebSocket from "ws";
import {
  createMessage,
  deleteMessage,
  getMessageHistory,
} from "../controllers/messageController";
import { handleConnectionError } from "./websocketUtils";
import { Message } from "../models/types/message";

/**
 * Message Utils
 * Primary Goal: Get all Chats
 */

export const fetchAllChats = async (ws: WebSocket) => {
  return getMessageHistory()
    .then((history) => {
      ws.send(JSON.stringify({ type: "history", data: history }));
    })
    .catch((e) => {
      return handleConnectionError(ws, e);
    });
};

/**
 * Message Utils
 * Primary Goal: Create a chat message
 */

export const createChatMessage = async (data: Message, ws: WebSocket) => {
  return createMessage(data)
    .then((res) => {
      return {
        message: res.message,
        sender: res.sender,
        time: res.createdAt,
        username: res.username,
      };
    })
    .catch((e) => {
      return handleConnectionError(ws, e);
    });
};

/**
 * Message Utils
 * Primary Goal: Delete chat message fucntionality
 */

export const deleteChatMessage = async (id: string, ws: WebSocket) => {
  return deleteMessage(id)
    .then((res) => {
      if (res.deletedCount === 0) {
        throw new Error("This message has already been deleted");
      } else {
        fetchAllChats(ws);
        ws.send(
          JSON.stringify({
            type: "success",
            message: `Deleted message`,
          })
        );
      }
    })
    .catch((e) => {
      handleConnectionError(ws, e);
    });
};

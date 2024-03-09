import { fetchAllChats } from "../utils/messageUtils";
import { JwtAuth } from "../models/types/auth";
import { IncomingMessage } from "http";
import WebSocket from "ws";
import { actionHandler } from "../utils/websocketUtils";
import { ParsedMessage } from "../models/types/message";
import { validateMessageRequest } from "../models/validations/auth";

/**
 * Middleware
 * Primary Goal: Middleware handles the connection function
 */

export const connection = (
  ws: WebSocket,
  _: IncomingMessage,
  authData: JwtAuth
) => {
  ws.on("error", (e) => console.error("socket connection error", e));

  // on connection to the socket we pull the chat history and send it to the client
  fetchAllChats(ws);

  // action handler to handle incoming messages from client
  ws.on("message", (data) => {
    if (validateMessageRequest(data, ws)) {
      const parsedData: ParsedMessage = JSON.parse(data.toString());
      return actionHandler(parsedData, authData, ws);
    }
  });

  ws.on("close", () => {
    console.info("connection closed");
  });
};

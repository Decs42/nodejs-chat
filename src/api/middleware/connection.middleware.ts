import { fetchAllChats } from "../utils/messageUtils";
import { JwtAuth } from "../models/types/auth";
import { IncomingMessage } from "http";
import WebSocket from "ws";
import { actionHandler } from "../utils/websocketUtils";
import { ParsedMessage } from "../models/types/message";

/**
 * Middleware
 * Primary Goal: Middleware handles the connection function
 */

export const connection = (
  ws: WebSocket,
  _: IncomingMessage,
  authData: JwtAuth
) => {
  ws.on("error", (e) => console.log("socket connection error", e));

  // on connection to the socket we pull the chat history and send it to the client
  fetchAllChats(ws);

  // action handler to handle incoming messages from client
  ws.on("message", (data) => {
    const parsedData: ParsedMessage = JSON.parse(data.toString());
    actionHandler(parsedData, authData, ws);
  });

  ws.on("close", () => {
    console.log("connection closed");
  });
};

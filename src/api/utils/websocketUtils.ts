import { JwtAuth } from "../models/types/auth";
import { wss } from "../config/webSocket.config";
import { Duplex } from "stream";
import { IncomingMessage } from "http";
import { ParsedMessage } from "../models/types/message";
import WebSocket from "ws";
import { createChatMessage, deleteChatMessage } from "./messageUtils";
import { verifyToken } from "./authUtils";

/**
 * Websocket Utils
 * Primary Goal: Handle the socket connection error and sends to client
 */

export const handleConnectionError = (ws: WebSocket, e: unknown) => {
  return ws.send(
    JSON.stringify({
      type: "error",
      message: `Error: ${e}`,
    })
  );
};

/**
 * Websocket Utils
 * Primary Goal: Authenticate a user and upgrade their connection to socket
 */

export const authenticateUser = (
  authorization: string | undefined,
  req: IncomingMessage,
  socket: Duplex,
  head: Buffer
) => {
  try {
    const formatedAuthHeader = authorization?.split(" ")[1];
    if (!formatedAuthHeader) {
      throw new Error("Access token is missing");
    }
    const authData = verifyToken(formatedAuthHeader);

    return wss.handleUpgrade(req, socket, head, (websocket) => {
      socket.removeListener("error", () => console.log("socket upgrade error"));
      wss.emit("connection", websocket, req, authData);
    });
  } catch (err: unknown) {
    socket.write(
      `HTTP/1.1 ${
        err instanceof Error && err.name === "TokenExpiredError"
          ? "401 Expired token"
          : "401 Unauthorized"
      }\r\n` +
        `Content-Length: 0\r\n` +
        `Connection: close\r\n\r\n`
    );
    socket.end();
    return;
  }
};

/**
 * Websocket Utils
 * Primary Goal: Action handler for any incoming messages sent from a client
 */

export const actionHandler = async (
  parsedData: ParsedMessage,
  authData: JwtAuth,
  ws: WebSocket
) => {
  if (parsedData.action === "send_message") {
    const chat = await createChatMessage(
      {
        sender: authData.userId,
        message: parsedData.data,
        username: authData.userName,
      },
      ws
    );

    if (chat) {
      return wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              message: chat.message,
              sender: chat.sender,
              time: chat.time,
              username: chat.username,
            })
          );
        }
      });
    }
  } else {
    deleteChatMessage(parsedData.data, ws);
  }
};

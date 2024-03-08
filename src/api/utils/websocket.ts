import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../constants/global";
import { JwtAuth } from "../models/types/auth";
import { wss } from "../config/webSocket";
import { Duplex } from "stream";
import { IncomingMessage } from "http";
import { createMessage, deleteMessage, getMessageHistory } from "./message";
import { ParsedMessage } from "../models/types/message";
import WebSocket from "ws";

/**
 * Websocket Utils
 * Primary Goal: Verifies the clients token
 */

export const verifyToken = (authToken: string) => {
  return jwt.verify(authToken, JWT_ACCESS_SECRET) as JwtAuth;
};

/**
 * Websocket Utils
 * Primary Goal: Handle the socket connection error and sends to client
 */

export const handleConnectionError = (ws: WebSocket, e: Error) => {
  console.log(e)
  return ws.send(
    JSON.stringify({
      type: "error",
      message: `Error: ${e.message}`,
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

export const actionHandler = (
  parsedData: ParsedMessage,
  authData: JwtAuth,
  ws: WebSocket
) => {
  if (parsedData.action === "send_message") {
    createMessage({
      sender: authData.userId,
      message: parsedData.data,
      username: authData.userName,
    })
      .then((res) => {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                message: res.message,
                sender: res.sender,
                time: res.createdAt,
                username: res.username,
              })
            );
          }
        });
      })
      .catch((e) => {
        handleConnectionError(ws, e);
      });
  } else {
    deleteMessage(parsedData.data)
      .then((res) => {
        if (res.deletedCount === 0) {
          throw new Error("This message has already been deleted");
        } else {
          getMessageHistory()
            .then((history) => {
              ws.send(JSON.stringify({ type: "history", data: history }));
            })
            .catch((e) => {
              handleConnectionError(ws, e);
            });
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
  }
};

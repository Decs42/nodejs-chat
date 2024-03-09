import { authenticateUser } from "../utils/websocketUtils";
import { IncomingMessage } from "http";
import { Duplex } from "stream";

/**
 * Middleware
 * Primary Goal: Upgrades the server request and handles authentication
 */

export const upgradeServer = (req: IncomingMessage, socket: Duplex, head: Buffer) => {
  socket.on("error", () => console.log("socket upgrade error"));

  const { authorization } = req.headers;
  return authenticateUser(authorization, req, socket, head);
};

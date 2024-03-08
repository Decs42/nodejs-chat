import { seedUsers } from "./api/utils/auth";
import { db } from "./api/config/db";
import { NODE_PORT } from "./api/constants/global";
import app from "./app";
import WebSocket from "ws";
import { actionHandler, authenticateUser } from "./api/utils/websocket";
import { JwtAuth } from "./api/models/types/auth";
import { getMessageHistory } from "./api/utils/message";
import { ParsedMessage } from "./api/models/types/message";
import { wss } from "./api/config/webSocket";

// opens a db coonection
db();

// seed db with three users
seedUsers().catch((e) => {
  console.log(`Something went wrong while seeding users: ${e}`);
});

const server = app.listen(NODE_PORT, () => {
  console.log(`server running on port ${NODE_PORT}`);
});

// on server upgrade , we authenticate and handle the upgrade to socket connection
server.on("upgrade", (req, socket, head) => {
  socket.on("error", () => console.log("socket upgrade error"));

  const { authorization } = req.headers;
  authenticateUser(authorization, req, socket, head);
});

wss.on("connection", (ws: WebSocket, authData: JwtAuth) => {
  ws.on("error", () => console.log("socket connection error"));

  // on connection to the socket we pull the chat history and send it to the client
  getMessageHistory()
    .then((history) => {
      ws.send(JSON.stringify({ type: "history", data: history }));
    })
    .catch((e) => {
      ws.send(
        JSON.stringify({
          type: "error",
          message: `Failed to get chat history: ${e.message}`,
        })
      );
    });

  // action handler to handle incoming messages from client
  ws.on("message", (data) => {
    const parsedData: ParsedMessage = JSON.parse(data.toString());
    actionHandler(parsedData, authData, ws);
  });

  ws.on("close", () => {
    console.log("connection closed");
  });
});

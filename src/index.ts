import { seedUsers } from "./api/utils/auth";
import { db } from "./api/config/db";
import { NODE_PORT } from "./api/constants/global";
import app from "./app";
import WebSocket, { WebSocketServer } from "ws";
import { authWebsocket } from "./api/utils/websocket";

// opens a db coonection
db();

// seed db with three users
seedUsers().catch((e) => {
  console.log(`Something went wrong while seeding users: ${e}`);
});

const server = app.listen(NODE_PORT, () => {
  console.log(`server running on port ${NODE_PORT}`);
});

const wss = new WebSocketServer({ noServer: true });

// need to refactor
server.on("upgrade", (req, socket, head) => {
  socket.on("error", () => console.log("socket upgrade error"));
  try {
    const { authorization } = req.headers;
    const formatedAuthHeader = authorization?.split(" ")[1];

    if (!formatedAuthHeader) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n');
      socket.destroy();
      return;
    }
    authWebsocket(formatedAuthHeader);

    wss.handleUpgrade(req, socket, head, (websocket) => {
      socket.removeListener("error", () => console.log("socket upgrade error"));
      wss.emit("connection", websocket, req);
    });
  } catch (err: unknown) {
    // console.log(err)
    socket.write(
      `HTTP/1.1 ${
        err instanceof Error && err.name === "TokenExpiredError"
          ? "401 Expired token"
          : "401 Unauthorized"
      }`
    );
    socket.destroy();
    return;
  }
});

wss.on("connection", (ws, req) => {
  ws.on("error", () => console.log("socket connection error"));

  ws.on("message", (msg, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg, { binary: isBinary });
      }
    });
  });

  ws.on("close", () => {
    console.log("connection closed");
  });
});

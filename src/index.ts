import { seedUsers } from "./api/utils/auth";
import { db } from "./api/config/db";
import { NODE_PORT } from "./api/constants/global";
import app from "./app";
import WebSocket, { WebSocketServer } from "ws";
import { authWebsocket } from "./api/utils/websocket";
import { JwtAuth } from "api/models/types/auth";
import { IncomingMessage } from "http";
import { createMessage, getMessageHistory } from "./api/utils/message";

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
      throw new Error("Access token is missing");
    }
    const authData = authWebsocket(formatedAuthHeader);

    wss.handleUpgrade(req, socket, head, (websocket) => {
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
});

wss.on(
  "connection",
  (ws: WebSocket, req: IncomingMessage, authData: JwtAuth) => {
    ws.on("error", () => console.log("socket connection error"));

    getMessageHistory()
      .then((history) => {
        ws.send(JSON.stringify({ type: "history", history }));
      })
      .catch((e) => {
        ws.send(
          JSON.stringify({
            type: "error",
            error: `Failed to get chat history: ${e.message}`,
          })
        );
      });

    ws.on("message", (data) => {
      const parsedData = JSON.parse(data.toString());

      switch (true) {
        case parsedData?.action === "message":
          createMessage({
            sender: authData.userId,
            message: parsedData.data,
            username: authData.userName
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
              ws.send(
                JSON.stringify({
                  type: "error",
                  error: `Failed to send message: ${e.message}`,
                })
              );
            });

        case parsedData?.type === "delete_message":
          console.log('delete message here')
      }
    });

    ws.on("close", () => {
      console.log("connection closed");
    });
  }
);

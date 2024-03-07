import { seedUsers } from "./api/utils/auth";
import { db } from "./api/config/db";
import { NODE_PORT } from "./api/constants/global";
import app from "./app";
import WebSocket, { WebSocketServer } from "ws";

// opens a db coonection
db();

// seed db with three users
seedUsers().catch((e) => {
  console.log(`Something went wrong while seeding users: ${e}`);
});

app.listen(NODE_PORT, () => {
  console.log(`server running on port ${NODE_PORT}`);
});

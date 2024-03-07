import { seedUsers } from "./api/utils/auth";
import { db } from "./api/config/db";
import { NODE_PORT, SEED_USERS } from "./api/constants/global";
import app from "./app";
import WebSocket, { WebSocketServer } from "ws";

const port: Number = NODE_PORT;

// opens a db coonection
db();

// seed db with three users
seedUsers().catch((e) => {
  console.log(`Something went wrong while seeding users: ${e}`);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

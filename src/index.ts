import { seedUsers } from "./api/utils/auth";
import { db } from "./api/config/db";
import { NODE_PORT } from "./api/constants/global";
import app from "./app";
import { wss } from "./api/config/webSocket";
import { upgradeServer } from "./api/middleware/upgradeServer";
import { connection } from "./api/middleware/connection";

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
server.on("upgrade", upgradeServer);

// handle connection that we emitted on the upgrade
wss.on("connection", connection);

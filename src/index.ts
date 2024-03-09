import { seedUsers } from "./api/utils/auth.utils";
import { db } from "./api/config/db.config";
import { NODE_PORT } from "./api/constants/global";
import app from "./app";
import { wss } from "./api/config/webSocket.config";
import { upgradeServer } from "./api/middleware/upgradeServer.middleware";
import { connection } from "./api/middleware/connection.middleware";

// opens a db coonection
db();

// seed db with three users
seedUsers();

const server = app.listen(NODE_PORT, () => {
  console.log(`server running on port ${NODE_PORT}`);
});

// on server upgrade , we authenticate and handle the upgrade to socket connection
server.on("upgrade", upgradeServer);

// handle connection that we emitted on the upgrade
wss.on("connection", connection);

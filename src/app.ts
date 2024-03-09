import express, { Express, Response } from "express";
import { errorHandler } from "./api/middleware/errorHandler.middleware";

import api from "./api/index";

const app: Express = express();

app.use(express.json());
app.disable("x-powered-by");
app.use("/api", api);

app.all("*", (_, res: Response) => {
  res.status(404).json({ message: "Route is not found" });
});

app.use(errorHandler);

export default app;

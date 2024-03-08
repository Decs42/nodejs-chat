import express, { Express, Request, Response } from "express";

import api from "./api/index";

const app: Express = express();

app.use(express.json());
app.disable("x-powered-by");
app.use("/api", api);

app.all("*", (_, res: Response) => {
  res.status(404).json({ message: "Route is not found" });
});

export default app;

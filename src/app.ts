import express, { Express } from "express";
import api from "./api/index";

const app: Express = express();

app.use("/api", api);

export default app;
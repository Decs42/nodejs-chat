import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../constants/global";
import { JwtAuth } from "../models/types/auth";

export const authWebsocket = (authToken: string) => {
  return jwt.verify(authToken, JWT_ACCESS_SECRET) as JwtAuth;
};

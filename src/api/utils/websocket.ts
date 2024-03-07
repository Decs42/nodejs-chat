import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../constants/global";

export const authWebsocket = (authToken: string) => {
  return jwt.verify(authToken, JWT_ACCESS_SECRET);
};

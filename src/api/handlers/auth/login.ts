import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/user";
import { generateAccessToken } from "api/utils/auth";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await UserModel.find({ username });

  if (user.length === 0) {
    return res
      .status(403)
      .json({ message: "No user exists with this username" });
  }

  const validPassword = await bcrypt.compare(password, user[0]?.password);

  if (!validPassword) {
    return res.status(403).json({ message: "Invalid Password" });
  }

  const accessToken = generateAccessToken(user[0].id);

  return res.status(200).json({ state: "AUTHENTICATED", accessToken });
};

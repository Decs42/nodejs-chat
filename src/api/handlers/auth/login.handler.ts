import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../../utils/authUtils";
import { findUserByUsername } from "../../controllers/userController";

/**
 * Login handler
 * Primary Goal: validate the login input and return an access token and login state
 */

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    if (!password || !username) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await findUserByUsername(username);

    if (user.length === 0) {
      return res
        .status(403)
        .json({ message: "No user exists with this username" });
    }

    const validPassword: boolean = await bcrypt.compare(
      password,
      user[0]?.password
    );

    if (!validPassword) {
      return res.status(403).json({ message: "Invalid Password" });
    }

    const accessToken: string = generateAccessToken(
      user[0].id,
      user[0].username
    );

    return res.status(200).json({ state: "AUTHENTICATED", accessToken });
  } catch (e) {
    next(e);
  }
};

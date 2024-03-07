import { UserModel } from "../models/user";
import { JWT_ACCESS_SECRET, SEED_USERS } from "../constants/global";
import { User } from "../models/types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const seedUsers = async () => {
  const allUsers: User[] = await UserModel.find({});

  if (allUsers.length === 0) {
    const usersWithHashedPassword = SEED_USERS.map((user) => ({
      ...user,
      password: hashPassword(user.password),
    }));
    await UserModel.insertMany(usersWithHashedPassword);
  }

  return;
};

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

import { UserModel } from "../models/user";
import { JWT_ACCESS_SECRET, SEED_USERS } from "../constants/global";
import { SeedUser, User } from "../models/types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Authentication Utils
 * Primary Goal: Uses synchronous hashing to hash a password for seeded users
 */

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Authentication Utils
 * Primary Goal: Seeds users if there is no users in the db
 */

export const seedUsers = async () => {
  const allUsers: User[] = await UserModel.find({});

  if (allUsers.length === 0) {
    const usersWithHashedPassword: SeedUser[] = SEED_USERS.map((user) => ({
      ...user,
      password: hashPassword(user.password),
    }));
    await UserModel.insertMany(usersWithHashedPassword);
  }

  return;
};

/**
 * Authentication Utils
 * Primary Goal: Generates an access token for the user
 */

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

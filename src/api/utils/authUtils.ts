import { JWT_ACCESS_SECRET, SEED_USERS } from "../constants/global";
import { SeedUser } from "../models/types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createManyusers, fetchAllusers } from "./userUtils";
import { JwtAuth } from "../models/types/auth";

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
  const allUsers = await fetchAllusers();

  if (allUsers.length === 0) {
    const usersWithHashedPassword: SeedUser[] = SEED_USERS.map((user) => ({
      ...user,
      password: hashPassword(user.password),
    }));
    await createManyusers(usersWithHashedPassword);
  }

  return;
};

/**
 * Authentication Utils
 * Primary Goal: Generates an access token for the user
 */

export const generateAccessToken = (userId: string, userName: string) => {
  return jwt.sign({ userId, userName }, JWT_ACCESS_SECRET);
};


/**
 * Authentication Utils
 * Primary Goal: Verifies the clients token
 */

export const verifyToken = (authToken: string) => {
  return jwt.verify(authToken, JWT_ACCESS_SECRET) as JwtAuth;
};

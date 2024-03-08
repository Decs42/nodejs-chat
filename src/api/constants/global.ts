import { SeedUser } from "../models/types/user";


/**
 * Global Constants
 * Primary Goal: Provide global constants to reuse throughout code base
 */

export const NODE_PORT: Number = 8080;
export const MONGO_DB_URL: string = "mongodb://127.0.0.1/db";
export const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET ?? "super-secret";

export const SEED_USERS: SeedUser[] = [
  {
    username: "Charmander",
    password: "Charmander1234!",
  },
  {
    username: "Squirtle",
    password: "Squirtle1234!",
  },
  {
    username: "Bulbasaur",
    password: "Bulbasaur1234!",
  },
];

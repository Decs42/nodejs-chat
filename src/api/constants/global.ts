import { User } from "../models/types/user";

export const NODE_PORT: Number = 8080;
export const MONGO_DB_URL: string = "mongodb://127.0.0.1/db";

export const SEED_USERS: User[] = [
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

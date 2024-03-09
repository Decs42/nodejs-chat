import { SeedUser } from "../models/types/user";
import { createUsers, getAllUsers } from "../controllers/user.controller";

/**
 * User Utils
 * Primary Goal: Uses synchronous hashing to hash a password for seeded users
 */

export const fetchAllusers = async () => {
  return getAllUsers()
    .then((res) => {
      return res;
    })
    .catch((e) => {
      throw Error(`Failed to get all users: ${e.message}`);
    });
};

/**
 * User Utils
 * Primary Goal: Uses synchronous hashing to hash a password for seeded users
 */

export const createManyusers = async (data: SeedUser[]) => {
  return createUsers(data)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      throw Error(`Failed to create multiple users: ${e.message}`);
    });
};

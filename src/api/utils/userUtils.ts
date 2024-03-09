import { SeedUser } from "../models/types/user";
import { createUsers, getAllUsers } from "../controllers/userController";

/**
 * User Utils
 * Primary Goal: Uses synchronous hashing to hash a password for seeded users
 */

export const fetchAllusers = async () => {
  try {
    const res = await getAllUsers();
    return res;
  } catch (e) {
    throw Error(`Failed to get all users: ${e}`);
  }
};

/**
 * User Utils
 * Primary Goal: Uses synchronous hashing to hash a password for seeded users
 */

export const createManyusers = async (data: SeedUser[]) => {
  try {
    const res = await createUsers(data);
    return res;
  } catch (e) {
    throw Error(`Failed to create multiple users: ${e}`);
  }
};

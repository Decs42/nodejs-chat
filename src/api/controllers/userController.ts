import { SeedUser } from "../models/types/user";
import { UserModel } from "../models/user";

/**
 * User Controller
 * Primary Goal: gets all users
 */

export const getAllUsers = async () => {
  return await UserModel.find({}, { password: 0 })
    .then((allUsers) => allUsers)
    .catch((e) => {
      throw e;
    });
};

/**
 * User Controller
 * Primary Goal: gets all users
 */

export const createUsers = async (data: SeedUser[]) => {
  return await UserModel.insertMany(data)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};

/**
 * User Controller
 * Primary Goal: get user by username
 */

export const findUserByUsername = async (username: string) => {
  return await UserModel.find({ username })
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};

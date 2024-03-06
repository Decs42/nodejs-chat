import { UserModel } from "../models/user";
import { SEED_USERS } from "../constants/global";
import { User } from "../models/types/user";

export const seedUsers = async () => {
  const allUsers: User[] = await UserModel.find({});

  if (allUsers.length === 0) {
    await UserModel.insertMany(SEED_USERS);
  }

  return;
};

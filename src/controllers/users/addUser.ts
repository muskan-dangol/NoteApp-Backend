import UserModel, { Users } from "../../models/user";
import { NextFunction } from "express";

const addUser = async (user: Users, next: NextFunction): Promise<Users> => {
  try {
    const newUser = new UserModel(user);
    const savedUsers = await newUser.save();
    return savedUsers;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
    throw new Error("Error Creating new user to MongoDB: " + error);
  }
};
export default addUser;

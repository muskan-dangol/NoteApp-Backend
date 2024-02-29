import UserModel, { Users } from "../../models/user";

export const getUsers = async (): Promise<Users[]> => {
  try {
    const allUsers = await UserModel.find().populate('notes', {title:1, content:1, date: 1});
    return allUsers;
  } catch (error) {
    throw new Error("Error fetching users from MongoDB: " + error);
  }
};

export const getUsersById = async (id: string) => {
  try {
    const user = await UserModel.findById(id).populate('notes', {title:1, content:1});
    if (!user) {
      console.log(`User with ID ${id} not found`);
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user by id from database");
  }
};

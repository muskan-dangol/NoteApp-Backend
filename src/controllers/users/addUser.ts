import UserModel, { Users } from "../../models/user";

const addUser = async (user: Users): Promise<Users> => {
  try {
    const newUser = new UserModel(user);
    const savedUsers = await newUser.save();
    return savedUsers;
  } catch (error) {
    throw new Error("Error Creating new user to MongoDB: " + error);
  }
};
export default addUser;

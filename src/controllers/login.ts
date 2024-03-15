import UserModel from "../models/user";

export const loginController = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username});
    
    if (!user) {
      console.log(`User ${username} not found`);
    }
    return user;
  } catch (error) {
    throw new Error("Error while sigining: ");
  }
};

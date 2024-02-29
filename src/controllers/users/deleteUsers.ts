import UserModel, { Users } from "../../models/user";

export const deleteUsersById = async (id: string): Promise<Users | null> => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return null;
    }
    await UserModel.findByIdAndDelete(id);
    return null;
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

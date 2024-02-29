import { Request, Response } from "express";
import { deleteUsersById } from "../../controllers/users/deleteUsers";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedUser = await deleteUsersById(id);
    res.json(deletedUser);
  } catch (error) {
    console.log("Error deleting user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

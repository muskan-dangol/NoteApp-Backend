import { Request, Response } from "express";
import { getUsers, getUsersById } from "../../controllers/users/getUsers";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const getUser = await getUsers();
    res.json(getUser);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUsersById(id);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

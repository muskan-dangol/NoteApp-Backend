import { NextFunction, Request, Response } from "express";
import { deleteUsersById } from "../../controllers/users/deleteUsers";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedUser = await deleteUsersById(id);
    res.json(deletedUser);
  } catch (error) {
    return next(error);
  }
};

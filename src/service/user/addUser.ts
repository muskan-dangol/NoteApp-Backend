import bcrypt from "bcrypt";
import addUser from "../../controllers/users/addUser";
import newUserEntry from "../../utils/userutils";
import { Request, Response } from "express";
import userModal from "../../models/user";

export const createNewUser = async (req: Request, res: Response) => {
  const {username, name, password} = newUserEntry(req.body);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new userModal({username, name, password:passwordHash});
  const savedUser = await addUser(user);
  res.status(201).json(savedUser);
};

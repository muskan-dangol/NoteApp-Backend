import bcrypt from "bcrypt";
import addUser from "../../controllers/users/addUser";
import newUserEntry from "../../utils/userutils";
import { NextFunction, Request, Response } from "express";
import userModal from "../../models/user";

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, name, password } = newUserEntry(req.body);
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both username and password are required" });
  }
  try {
    const existingUser = await userModal.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new userModal({ username, name, password: passwordHash });
    const savedUser = await addUser(user, next);
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

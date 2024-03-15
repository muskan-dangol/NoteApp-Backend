import { sign } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { loginController } from "../controllers/login";
import bcrypt from "bcrypt";
// import error from "../utils/logger";
import dotenv from "dotenv";

dotenv.config();
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };
    const user = await loginController(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const secretKey = process.env.SECRET || "defaultSecret";
    const token = sign(userForToken, secretKey, { expiresIn: 60 * 60 });
    return res
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
    console.error("Error fetching user: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

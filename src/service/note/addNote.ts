import newNoteEntry from "../../utils/noteutils";
import { addNote } from "../../controllers/notes/addNotes";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const getTokenFrom = (req: Request): string | null => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newNote = newNoteEntry(req.body);
    const token = getTokenFrom(req);
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    const secretKey = process.env.SECRET || "defaultSecret";
    if (!secretKey) {
      return res.status(401).json({ error: "Secret key not found" });
    }

    const decodedToken = jwt.verify(token, secretKey) as { id?: string | null };
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invali" });
    }
    const addedNote = await addNote(newNote, decodedToken, next);
    return res.status(201).json(addedNote);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import NotesModel, { Notes, parseContent, parseTitle, parseUsers } from "../../models/note";

import UserModel from "../../models/user";

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
    const newNoteEntry = (object: unknown): Notes => {
      if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
      }
      if ("title" in object && "content" in object && "user" in object) {
        const newNote: Notes = {
          title: parseTitle(object.title),
          content: parseContent(object.content),
          user: parseUsers(object.user)
        };
        return newNote;
      }
      throw new Error("Incorrect data: some fields are missing");
    };

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
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const user = await UserModel.findById(decodedToken.id);
    if (!user) {
      throw new Error("User not found");
    }

    const newNoteModel = new NotesModel({
      title: newNote.title,
      content: newNote.content,
      user: user._id,
    });

    const savedNote = await newNoteModel.save();
    user.notes = (user.notes || []).concat(savedNote._id);
    await user.save();

    return res.status(201).json(savedNote);
  } catch (error) {
    next(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

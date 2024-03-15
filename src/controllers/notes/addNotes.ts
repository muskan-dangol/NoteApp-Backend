import { NextFunction } from "express";
import NotesModel, { Notes } from "../../models/note";
import UserModel from "../../models/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addNote = async (entry: Notes, decodedToken: any,
  next: NextFunction
): Promise<Notes> => {
  try {
    const user = await UserModel.findById(decodedToken.id);
    if (!user) {
      throw new Error("User not found");
    }
    const newNote = new NotesModel({
      title: entry.title,
      content: entry.content,
      user: user._id,
    });

    const savedNotes = await newNote.save();
    user.notes = (user.notes || []).concat(savedNotes._id);
    await user.save();

    return savedNotes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    next(error);
    throw new Error("Error saving note to MongoDB: " + error);
  }
};

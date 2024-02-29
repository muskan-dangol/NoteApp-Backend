import NotesModel, { Notes } from "../../models/note";
import UserModel from "../../models/user";

export const addNote = async (entry: Notes, userId: unknown): Promise<Notes> => {
  try {
    const user = await UserModel.findById(userId);
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
  } catch (error) {
    throw new Error("Error saving note to MongoDB: " + error);
  }
};

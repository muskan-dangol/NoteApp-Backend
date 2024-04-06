import NotesModel, { Notes } from "../../models/note";

export const deleteNotesById = async (id: string): Promise<Notes | null> => {
  try {
    const note = await NotesModel.findById(id);
    if (!note) {
      return null;
    }
    await NotesModel.findByIdAndDelete(id);
    return null;
  } catch (error) {
    throw new Error("Error deleting note by ID from MongoDB: " + error);
  }
};
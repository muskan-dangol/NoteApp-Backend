import NotesModel, { Notes } from "./note";

export const deleteNotesById = async (id: string): Promise<Notes | null> => {
  try {
    const note = await NotesModel.findById(id);
    if(!note){
      return null;
    }
    const deletedNote = await NotesModel.findByIdAndDelete(id);
    return deletedNote;
  } catch (error) {
    throw new Error("Error deleting note by ID from MongoDB: " + error);
  }
};


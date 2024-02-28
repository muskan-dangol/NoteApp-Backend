import NotesModel, { Notes } from "../../models/note";

export const updateNoteById = async (id: string, updatedNote: Partial<Notes>): Promise<Notes | null> => {
  try {
    const updatedNoteResult = await NotesModel.findByIdAndUpdate(id, updatedNote, { new: true });

    if (!updatedNoteResult) {
      console.log(`Note with ID ${id} not found for update`);
    }
    return updatedNoteResult;
  } catch (error) {
    throw new Error("Error updating note by ID in MongoDB: " + error);
  }
};

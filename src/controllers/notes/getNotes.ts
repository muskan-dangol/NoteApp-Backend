import NotesModel, { Notes } from "../../models/note";

export const getNotes = async (): Promise<Notes[]> => {
  try {
    const allNotes = await NotesModel.find().populate("user", {
      username: 1,
      name: 1,
    });
    return allNotes;
  } catch (error) {
    throw new Error("Error fetching notes from MongoDB: " + error);
  }
};

export const getNotesById = async (id: string) => {
  try {
    const note = await NotesModel.findById(id);
    if (!note) {
      console.log(`Note with ID ${id} not found`);
    }
    return note;
  } catch (error) {
    throw new Error("Error fetching note by ID from MongoDB: " + error);
  }
};

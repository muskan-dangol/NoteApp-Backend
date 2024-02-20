import NotesModel, { Notes } from "./note";


export const addNote = async (entry: Notes): Promise<Notes> => {
  try {
    const newNote = new NotesModel(entry);
    const savedNotes = await newNote.save();
    return savedNotes;
  } catch (error) {
    throw new Error("Error saving note to MongoDB: " + error);
  }
};


module.exports = { addNote };

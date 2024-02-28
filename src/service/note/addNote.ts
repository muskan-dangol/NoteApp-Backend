import newNoteEntry from "../../utils/noteutils";
import { addNote } from "../../controllers/notes/addNotes";
import { Request, Response } from "express";

 export const createNote = async(req:Request, res:Response) => {
    try {
      const newNote =  newNoteEntry(req.body);
      const addedNote = await addNote(newNote);
      res.status(201).json(addedNote);
    } catch (error) {
      console.error("Error adding a note:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};
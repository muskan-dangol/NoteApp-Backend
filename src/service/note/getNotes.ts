import { Request, Response } from "express";
import { getNotes, getNotesById } from "../../controllers/notes/getNotes"; // Correcting the path

export const getAllNotes = async (_req: Request, res: Response) => {
  try {
    const allNotes = await getNotes();
    res.json(allNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await getNotesById(id);
    res.json(note);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

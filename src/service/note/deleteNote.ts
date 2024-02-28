import { Request, Response } from "express";
import { deleteNotesById } from "../../controllers/notes/deleteNotes"; // Correcting the path

export const deleteNotes = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedNote = await deleteNotesById(id);
    res.json(deletedNote);
  } catch (error) {
    console.error("Error deleting notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

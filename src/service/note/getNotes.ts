import { Request, Response } from "express";
import { getNotes, getNotesById } from "../../controllers/notes/getNotes"; // Correcting the path

interface CustomRequest extends Request {
  userId?: string;
}
export const getAllNotes = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId as string;
    const allNotes = await getNotes(userId);
    res.json(allNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await getNotesById(id);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

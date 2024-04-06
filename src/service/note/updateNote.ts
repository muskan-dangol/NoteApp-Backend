import { Request, Response } from "express";
import { updateNoteById } from "../../controllers/notes/updateNotes";

export const updatedNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const updatedNote = await updateNoteById(id, req.body);
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import express from "express";
import { createNote } from "./src/service/addNote";
import { getAllNotes, getNote } from "./src/service/getNotes";
import { deleteNotes } from "./src/service/deleteNote";
import { updatedNote } from "./src/service/updateNote";
const router = express.Router();

router.post("/notes", createNote);

router.get("/notes", getAllNotes);
router.get("/notes/:id", getNote);
router.delete("/notes/:id", deleteNotes);
router.put("/notes/:id", updatedNote);
export default router;

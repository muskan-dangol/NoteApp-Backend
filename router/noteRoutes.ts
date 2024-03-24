import express from "express";
import { createNote } from "../src/service/note/addNote";
import { getAllNotes, getNote } from "../src/service/note/getNotes";
import { deleteNotes } from "../src/service/note/deleteNote";
import { updatedNote } from "../src/service/note/updateNote";
import {authenticateToken} from "../src/middleware/userAuthentication";
const router = express.Router();

router.post("/", authenticateToken, createNote);

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.delete("/:id", deleteNotes);
router.put("/:id", updatedNote);

export default router;

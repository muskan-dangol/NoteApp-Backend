import express from "express";
import notesRouter from "./noteRoutes";
import userRouter from "./userRoutes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/notes", notesRouter);

export default router;

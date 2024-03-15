import express from "express";
import notesRouter from "./noteRoutes";
import userRouter from "./userRoutes";
import signinRouter from "./loginRouter";
const router = express.Router();

router.use("/users", userRouter);
router.use("/notes", notesRouter);
router.use("/login", signinRouter);

export default router;

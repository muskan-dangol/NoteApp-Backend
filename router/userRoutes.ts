import express from "express";
import { createNewUser } from "../src/service/User";

const router = express.Router();

router.post("/", createNewUser);

export default router;

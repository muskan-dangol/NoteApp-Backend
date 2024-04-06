import express from "express";
import { createNewUser } from "../src/service/user/addUser";
import { getUser, getAllUsers } from "../src/service/user/getUsers";
import { deleteUser } from "../src/service/user/deleteUser";

const router = express.Router();

router.post("/", createNewUser); //route for signup

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;

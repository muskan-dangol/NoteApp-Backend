import { Error } from "mongoose";
import {
  Users,
  parseUsername,
  parsename,
  parsepasswordHash,
} from "../models/user";


const newUserEntry = (object: unknown): Users => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "username" in object &&
    "name" in object &&
    "password" in object 
  ) {
    const newUser: Users = {
      username: parseUsername(object.username),
      name: parsename(object.name),
      password: parsepasswordHash(object.password),
    };
    return newUser;
  }
  throw new Error("Incorrect data: some fields are missing");
};



export default newUserEntry;

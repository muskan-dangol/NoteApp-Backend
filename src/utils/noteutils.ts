import { Error } from "mongoose";
import { Notes, parseContent, parseTitle, parseUsers } from "../models/note";

const newNoteEntry = (object: unknown): Notes => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("title" in object && "content" in object && "user" in object) {
    const newNote: Notes = {
      title: parseTitle(object.title),
      content: parseContent(object.content),
      user: parseUsers(object.user)
    };
    return newNote;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default newNoteEntry;

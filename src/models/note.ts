import moment from "moment";
import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface Notes {
  title: string;
  content: string;
  date?: string;
  user: mongoose.Types.ObjectId[];
}

const noteSchema = new Schema<Notes>({
  title: { type: String, required: true, minlength: 5  },
  content: { type: String, minlength: 5 },
  date: { type: String, default: moment().format("L") },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const parseContent = (content: unknown): string => {
  if (!content || !isString(content)) {
    throw new Error("Incorrect or missing content");
  }
  return content;
};

export const parseTitle = (title: unknown): string => {
  if (!title || !isString(title)) {
    throw new Error("Incorrect or missing title");
  }
  return title;
};

export const parseUsers = (user: unknown): mongoose.Types.ObjectId[] => {
  if (!user || !Array.isArray(user)) {
    throw new Error("Incorrect or missing users");
  }

  return user.map((user) => {
    if (!user || !isString(user)) {
      throw new Error("Incorrect or missing user in users");
    }
    return new mongoose.Types.ObjectId(user);
  });
};

const NotesModel = mongoose.model<Notes>("Notes", noteSchema);

export default NotesModel;

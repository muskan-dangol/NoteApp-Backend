import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface Notes {
  title: string;
  content: string;
  date?: Date;
}

const noteSchema = new Schema<Notes>({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now()},
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
    throw new Error("Incorrect or missing content");
  }
  return title;
};

const NotesModel = mongoose.model<Notes>("Notes", noteSchema);

export default NotesModel;

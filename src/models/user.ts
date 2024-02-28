import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface Users {
  username: string;
  name: string;
  password: string;
  notes?: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<Users>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notes" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error("Incorrect or missing username");
  }
  return username;
};

export const parsename = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

export const parsepasswordHash = (passwordHash: unknown): string => {
  if (!passwordHash || !isString(passwordHash)) {
    throw new Error("Incorrect or missing passwordHash");
  }
  return passwordHash;
};

export const parsenotes = (notes: unknown): mongoose.Types.ObjectId[] => {
  if (!notes || !Array.isArray(notes)) {
    throw new Error("Incorrect or missing notes");
  }

  return notes.map((note) => {
    if (!note || typeof note !== "string") {
      throw new Error("Incorrect or missing note in notes");
    }
    return new mongoose.Types.ObjectId(note);
  });
};

const UserModel = mongoose.model<Users>("User", userSchema);
export default UserModel;

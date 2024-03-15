import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface Users {
  username: string;
  name: string;
  password: string;
  notes?: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<Users>({
  username: { type: String, required: true, unique: true, minlength: 3 },
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 3 },
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

const UserModel = mongoose.model<Users>("User", userSchema);
export default UserModel;

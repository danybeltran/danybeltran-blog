import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface INote extends Document {
  title?: string;
  content?: string;
  color?: string;
  date: string;
  folder: string;
  user: string;
  shared: Array<{
    email: string;
    permissions: "r" | "rw" | "rwd";
  }>;
  lastEdited: string;
}

const NoteSchema: Schema = new Schema({
  title: {
    type: String,
    default: "Untitled note",
  },
  content: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "white-black",
  },
  date: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  shared: {
    type: Array,
    required: false,
    default: [],
  },
  lastEdited: {
    type: String,
    required: true,
  },
});

export const Note: Model<INote> =
  mongoose.models.Note || model("Note", NoteSchema);

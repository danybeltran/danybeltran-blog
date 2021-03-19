import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  folders: {
    type: Array,
    default: [
      {
        name: "My notes",
        elements: [],
      },
    ],
  },
});

export const User: Model<IUser> =
  mongoose.models.User || model("User", UserSchema);

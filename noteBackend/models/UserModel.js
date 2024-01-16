import mongoose from "mongoose";

export const User = mongoose.model(
  "Notes",
  new mongoose.Schema({
    user: {type: String, required: true}
  }),
  "Notes"
);
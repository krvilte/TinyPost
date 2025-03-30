import { model, Schema } from "mongoose";

const ThoughtsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: [50, "Title cannot exceed 50 characters."],
    },
    content: {
      type: String,
      required: true,
      max: [1000, "Content cannot exceed 1000 characters."],
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "excited", "meh", "curious"],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Thoughts = model("Thoughts", ThoughtsSchema);
export default Thoughts;

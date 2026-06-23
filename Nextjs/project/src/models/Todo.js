// models/Todo.js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [40, "Title cannot be more than 40 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot be more than 200 characters"],
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
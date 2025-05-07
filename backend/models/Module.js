import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    tags: [String],
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
    estimatedTime: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
export default Module;

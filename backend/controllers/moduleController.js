import Module from "../models/Module.js";
import mongoose from "mongoose";

// Controller for creating a new module
export const createModule = async (req, res) => {
  const { name, description, lessons, tags, difficulty, estimatedTime } =
    req.body;

  try {
    // Convert lessons to ObjectIds
    const lessonIds = lessons.map(
      (lesson) => new mongoose.Types.ObjectId(lesson)
    );

    const newModule = await Module.create({
      name,
      description,
      lessons: lessonIds,
      tags,
      difficulty,
      estimatedTime,
    });

    res.status(201).json({
      message: "Module created successfully",
      module: newModule,
    });
  } catch (error) {
    console.error("Error creating module:", error);
    res.status(400).json({ error: error.message });
  }
};
// Controller for getting all modules created by the current user
export const getModules = async (req, res) => {
  const userId = req.userId;

  try {
    const modules = await Module.find({ userId }).populate(
      "lessons",
      "lessonHeading"
    );
    res.status(200).json({ modules });
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ error: "Failed to fetch modules." });
  }
};

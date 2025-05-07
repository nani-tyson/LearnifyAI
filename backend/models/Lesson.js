import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  lessonData: {
    type: String,
    required: true,
    trim: true,
  },
  lessonHeading: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;

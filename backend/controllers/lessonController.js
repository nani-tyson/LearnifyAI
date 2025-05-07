// controllers/lessonController.js
import Lesson from '../models/Lesson.js';
import {generateLesson} from '../services/generateLesson.js';

export const createLesson = async (req, res) => {
  const { topic } = req.body;
  const userId = req.userId;

  if (!topic || !userId) {
    return res.status(400).json({ error: 'Topic and userId are required.' });
  }

  try {
    const lesson = await generateLesson(topic);

    const match = lesson.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const heading = match ? match[1] : topic;

    const newLesson = new Lesson({
      lessonData: lesson,
      lessonHeading: heading,
      userId,
    });

    await newLesson.save();
    console.log('Lesson generated and saved:', newLesson);
    res.status(201).json({ lessonPlan: lesson });
  } catch (err) {
    console.error('Error generating lesson:', err);
    res.status(500).json({ error: err.message || 'Lesson generation failed.' });
  }
};

export const getLessons = async (req, res) => {
  const userId = req.userId;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required.' });
  }

  try {
    const lessons = await Lesson.find({ userId });
    res.status(200).json({ lessons });
  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).json({ error: err.message || 'Could not fetch lessons.' });
  }
};

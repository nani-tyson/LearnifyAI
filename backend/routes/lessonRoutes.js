// routes/lessonRoutes.js
import express from 'express';
import { createLesson, getLessons } from '../controllers/lessonController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/lesson', verifyToken, createLesson);
router.get('/lesson', verifyToken, getLessons);

export default router;

import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authControllers.js';

const router = express.Router();

// Auth routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser)


export default router;

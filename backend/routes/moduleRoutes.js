import express from 'express';
import { createModule, getModules } from '../controllers/moduleController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Route to create a new module
router.post('/', verifyToken, createModule);

// Route to get all modules created by the current user
router.get('/', verifyToken, getModules);

export default router;

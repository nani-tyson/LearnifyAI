import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js'; // Assumes you have this helper
import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import editorRoutes from './routes/editorRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// console.log('JWT_SECRET:', process.env.JWT_SECRET);

// CORS Setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://course-gpt-ai.web.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// app.get('/', (req, res) => {
//   res.send('Backend is live');
// });

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/editor', editorRoutes);

// Connect to DB and Start Server
connectDB() 


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 😊`);
})
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';

// Route Imports
import scriptureRoutes from './routes/scripture.route';
import festivalRoutes from './routes/festival.route';
import quizRoutes from './routes/quiz.route';
import storyRoutes from './routes/story.route';
import reelRoutes from './routes/reel.route';
import userRoutes from './routes/user.route';
import adminRoutes from './routes/admin.route';
import contributionRoutes from './routes/contribution.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/v1/scriptures', scriptureRoutes);
app.use('/api/v1/festivals', festivalRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/stories', storyRoutes);
app.use('/api/v1/reels', reelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/contributions', contributionRoutes);

// Serve frontend static files
const rootDir = process.cwd();
app.use(express.static(path.join(rootDir, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Error Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

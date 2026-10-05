import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import Quiz from '../models/quiz.model';

// @desc    Get all quizzes
// @route   GET /api/v1/quizzes
// @access  Public
export const getQuizzes = asyncHandler(async (req: Request, res: Response) => {
  const quizzes = await Quiz.find({});
  res.json(quizzes);
});

// @desc    Get single quiz by id
// @route   GET /api/v1/quizzes/:id
// @access  Public
export const getQuizById = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Create a quiz
// @route   POST /api/v1/quizzes
// @access  Private/Admin
export const createQuiz = asyncHandler(async (req: Request, res: Response) => {
  const quiz = new Quiz(req.body);
  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

// @desc    Update a quiz
// @route   PUT /api/v1/quizzes/:id
// @access  Private/Admin
export const updateQuiz = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Delete a quiz
// @route   DELETE /api/v1/quizzes/:id
// @access  Private/Admin
export const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (quiz) {
    res.json({ message: 'Quiz removed' });
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

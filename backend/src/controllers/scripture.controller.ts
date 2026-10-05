import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import Scripture from '../models/scripture.model';

// @desc    Get all scriptures
// @route   GET /api/v1/scriptures
// @access  Public
export const getScriptures = asyncHandler(async (req: Request, res: Response) => {
  const scriptures = await Scripture.find({});
  res.json(scriptures);
});

// @desc    Get single scripture
// @route   GET /api/v1/scriptures/:id
// @access  Public
export const getScriptureById = asyncHandler(async (req: Request, res: Response) => {
  const scripture = await Scripture.findById(req.params.id);

  if (scripture) {
    res.json(scripture);
  } else {
    res.status(404);
    throw new Error('Scripture not found');
  }
});

// @desc    Create a new scripture
// @route   POST /api/v1/scriptures
// @access  Public (should be protected in production)
export const createScripture = asyncHandler(async (req: Request, res: Response) => {
  const { sanskrit, transliteration, source, chapter, verse, explanations } = req.body;

  const scripture = await Scripture.create({
    sanskrit, transliteration, source, chapter, verse, explanations
  });

  if (scripture) {
    res.status(201).json(scripture);
  } else {
    res.status(400);
    throw new Error('Invalid scripture data');
  }
});

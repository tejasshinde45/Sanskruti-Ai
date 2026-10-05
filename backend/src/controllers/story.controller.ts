import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import Story from '../models/story.model';

// @desc    Get all stories
// @route   GET /api/v1/stories
// @access  Public
export const getStories = asyncHandler(async (req: Request, res: Response) => {
  const stories = await Story.find({});
  res.json(stories);
});

// @desc    Get single story by id
// @route   GET /api/v1/stories/:id
// @access  Public
export const getStoryById = asyncHandler(async (req: Request, res: Response) => {
  const story = await Story.findById(req.params.id);

  if (story) {
    res.json(story);
  } else {
    res.status(404);
    throw new Error('Story not found');
  }
});

// @desc    Create a story
// @route   POST /api/v1/stories
// @access  Private/Admin
export const createStory = asyncHandler(async (req: Request, res: Response) => {
  const story = new Story(req.body);
  const createdStory = await story.save();
  res.status(201).json(createdStory);
});

// @desc    Update a story
// @route   PUT /api/v1/stories/:id
// @access  Private/Admin
export const updateStory = asyncHandler(async (req: Request, res: Response) => {
  const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (story) {
    res.json(story);
  } else {
    res.status(404);
    throw new Error('Story not found');
  }
});

// @desc    Delete a story
// @route   DELETE /api/v1/stories/:id
// @access  Private/Admin
export const deleteStory = asyncHandler(async (req: Request, res: Response) => {
  const story = await Story.findByIdAndDelete(req.params.id);
  if (story) {
    res.json({ message: 'Story removed' });
  } else {
    res.status(404);
    throw new Error('Story not found');
  }
});

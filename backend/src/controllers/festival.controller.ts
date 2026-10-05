import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import Festival from '../models/festival.model';

// @desc    Get all festivals
// @route   GET /api/v1/festivals
// @access  Public
export const getFestivals = asyncHandler(async (req: Request, res: Response) => {
  const festivals = await Festival.find({});
  res.json(festivals);
});

// @desc    Get single festival by id
// @route   GET /api/v1/festivals/:id
// @access  Public
export const getFestivalById = asyncHandler(async (req: Request, res: Response) => {
  const festival = await Festival.findById(req.params.id);

  if (festival) {
    res.json(festival);
  } else {
    res.status(404);
    throw new Error('Festival not found');
  }
});

// @desc    Create a festival
// @route   POST /api/v1/festivals
// @access  Private/Admin
export const createFestival = asyncHandler(async (req: Request, res: Response) => {
  const festival = new Festival(req.body);
  const createdFestival = await festival.save();
  res.status(201).json(createdFestival);
});

// @desc    Update a festival
// @route   PUT /api/v1/festivals/:id
// @access  Private/Admin
export const updateFestival = asyncHandler(async (req: Request, res: Response) => {
  const festival = await Festival.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (festival) {
    res.json(festival);
  } else {
    res.status(404);
    throw new Error('Festival not found');
  }
});

// @desc    Delete a festival
// @route   DELETE /api/v1/festivals/:id
// @access  Private/Admin
export const deleteFestival = asyncHandler(async (req: Request, res: Response) => {
  const festival = await Festival.findByIdAndDelete(req.params.id);
  if (festival) {
    res.json({ message: 'Festival removed' });
  } else {
    res.status(404);
    throw new Error('Festival not found');
  }
});

import { Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import Contribution from '../models/contribution.model';
import Story from '../models/story.model';
import Scripture from '../models/scripture.model';
import Quiz from '../models/quiz.model';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Submit a new contribution (propose edit)
// @route   POST /api/v1/contributions
// @access  Private / Contributor
export const createContribution = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { targetType, targetId, proposedChanges } = req.body;

  const contribution = await Contribution.create({
    userId: req.user._id,
    targetType,
    targetId,
    proposedChanges,
  });

  res.status(201).json(contribution);
});

// @desc    Get all pending contributions
// @route   GET /api/v1/contributions/pending
// @access  Private / Admin
export const getPendingContributions = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contributions = await Contribution.find({ status: 'pending' }).populate('userId', 'name email');
  res.json(contributions);
});

// @desc    Approve a contribution
// @route   PUT /api/v1/contributions/:id/approve
// @access  Private / Admin
export const approveContribution = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contribution = await Contribution.findById(req.params.id);

  if (!contribution) {
    res.status(404);
    throw new Error('Contribution not found');
  }

  // Inject logic to overwrite the active database here!
  const { targetType, targetId, proposedChanges } = contribution;
  
  let targetDoc;
  if (targetType === 'Story') {
    targetDoc = await Story.findByIdAndUpdate(targetId, proposedChanges, { new: true });
  } else if (targetType === 'Scripture') {
    targetDoc = await Scripture.findByIdAndUpdate(targetId, proposedChanges, { new: true });
  } else if (targetType === 'Quiz') {
    targetDoc = await Quiz.findByIdAndUpdate(targetId, proposedChanges, { new: true });
  }

  if (!targetDoc) {
    res.status(404);
    throw new Error(`Target ${targetType} document not found`);
  }

  contribution.status = 'approved';
  await contribution.save();

  res.json({ message: 'Contribution approved successfully, logic applied instantly.', contribution });
});

// @desc    Reject a contribution
// @route   PUT /api/v1/contributions/:id/reject
// @access  Private / Admin
export const rejectContribution = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contribution = await Contribution.findById(req.params.id);

  if (contribution) {
    contribution.status = 'rejected';
    contribution.adminFeedback = req.body.feedback || '';
    await contribution.save();
    res.json({ message: 'Contribution rejected' });
  } else {
    res.status(404);
    throw new Error('Contribution not found');
  }
});

import { Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import User from '../models/user.model';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Update user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

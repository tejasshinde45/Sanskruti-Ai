import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import User from '../models/user.model';
import generateToken from '../utils/generateToken';
import { AuthRequest } from '../middlewares/authMiddleware';

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      points: user.points,
      token: generateToken(user._id.toString(), user.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await (user as any).matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      points: user.points,
      shlokasRead: user.shlokasRead,
      quizzesCompleted: user.quizzesCompleted,
      quizzesMastered: user.quizzesMastered,
      mapLocationsExplored: user.mapLocationsExplored,
      storiesCompleted: user.storiesCompleted,
      reelsWatched: user.reelsWatched,
      reelsSaved: user.reelsSaved,
      streak: user.streak,
      exploredModules: user.exploredModules,
      token: generateToken(user._id.toString(), user.role),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile (auto-sync stats)
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      points: user.points,
      shlokasRead: user.shlokasRead,
      quizzesCompleted: user.quizzesCompleted,
      quizzesMastered: user.quizzesMastered,
      mapLocationsExplored: user.mapLocationsExplored,
      storiesCompleted: user.storiesCompleted,
      reelsWatched: user.reelsWatched,
      reelsSaved: user.reelsSaved,
      streak: user.streak,
      exploredModules: user.exploredModules,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user progress generic API
// @route   PUT /api/v1/users/progress
// @access  Private
export const updateUserProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Expect partial payload to increment or set
  const { 
    pointsToAdd, 
    shlokasReadAdd, 
    storiesCompletedAdd,
    masterQuizId,
    reelsWatchedAdd,
    saveReelId 
  } = req.body;

  if (pointsToAdd) user.points += pointsToAdd;
  if (shlokasReadAdd) {
    user.shlokasRead += shlokasReadAdd;
    if (user.exploredModules) user.exploredModules.scripture += shlokasReadAdd;
  }
  if (storiesCompletedAdd) {
    user.storiesCompleted += storiesCompletedAdd;
    if (user.exploredModules) user.exploredModules.stories += storiesCompletedAdd;
  }
  if (reelsWatchedAdd) {
    user.reelsWatched += reelsWatchedAdd;
  }
  
  if (masterQuizId && !user.quizzesMastered.includes(masterQuizId)) {
    user.quizzesMastered.push(masterQuizId);
    user.quizzesCompleted += 1;
    if (user.exploredModules) user.exploredModules.quizzes += 1;
  }

  if (saveReelId && !user.reelsSaved.includes(saveReelId)) {
    user.reelsSaved.push(saveReelId);
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    points: updatedUser.points,
    shlokasRead: updatedUser.shlokasRead,
    storiesCompleted: updatedUser.storiesCompleted,
    quizzesCompleted: updatedUser.quizzesCompleted,
    quizzesMastered: updatedUser.quizzesMastered,
    reelsWatched: updatedUser.reelsWatched,
    reelsSaved: updatedUser.reelsSaved,
    exploredModules: updatedUser.exploredModules,
  });
});

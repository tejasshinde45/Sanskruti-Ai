import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProgress,
} from '../controllers/user.controller';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile);

router.route('/progress').put(protect, updateUserProgress);

export default router;

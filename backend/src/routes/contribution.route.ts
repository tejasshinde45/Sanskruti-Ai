import express from 'express';
import {
  createContribution,
  getPendingContributions,
  approveContribution,
  rejectContribution
} from '../controllers/contribution.controller';
import { protect, admin, contributorOrAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(protect, contributorOrAdmin, createContribution);
router.route('/pending').get(protect, admin, getPendingContributions);
router.route('/:id/approve').put(protect, admin, approveContribution);
router.route('/:id/reject').put(protect, admin, rejectContribution);

export default router;

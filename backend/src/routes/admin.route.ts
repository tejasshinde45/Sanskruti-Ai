import express from 'express';
import { getUsers, updateUserRole } from '../controllers/admin.controller';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id/role').put(protect, admin, updateUserRole);

export default router;

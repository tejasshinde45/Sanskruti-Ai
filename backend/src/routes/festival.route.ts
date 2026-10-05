import express from 'express';
import { getFestivals, getFestivalById, createFestival, updateFestival, deleteFestival } from '../controllers/festival.controller';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getFestivals)
  .post(protect, admin, createFestival);

router.route('/:id')
  .get(getFestivalById)
  .put(protect, admin, updateFestival)
  .delete(protect, admin, deleteFestival);

export default router;

import express from 'express';
import multer from 'multer';
import { getReels, createReel, deleteReel, updateReel } from '../controllers/reel.controller';
import { protect, admin } from '../middlewares/authMiddleware';
import path from 'path';

const router = express.Router();

// Setup Multer for local temp storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Append extension
  }
})
const upload = multer({ storage: storage });

router.route('/')
  .get(getReels)
  .post(protect, admin, upload.single('videoVideo'), createReel);

router.route('/:id')
  .put(protect, admin, upload.single('videoVideo'), updateReel)
  .delete(protect, admin, deleteReel);

export default router;

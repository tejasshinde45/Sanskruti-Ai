import express from 'express';
import { getScriptures, getScriptureById, createScripture } from '../controllers/scripture.controller';

const router = express.Router();

router.route('/').get(getScriptures).post(createScripture);
router.route('/:id').get(getScriptureById);

export default router;

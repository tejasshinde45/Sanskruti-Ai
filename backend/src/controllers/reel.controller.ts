import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import Reel from '../models/reel.model';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// @desc    Get all reels
// @route   GET /api/v1/reels
// @access  Public
export const getReels = asyncHandler(async (req: Request, res: Response) => {
  const reels = await Reel.find({});
  res.json(reels);
});

// @desc    Create a reel (with video upload)
// @route   POST /api/v1/reels
// @access  Private/Admin
export const createReel = asyncHandler(async (req: Request, res: Response) => {
  // If a file was uploaded, process it
  let videoSrc = req.body.videoSrc; // fallback if URL provided directly

  if (req.file) {
    // Upload video to cloudinary
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "vedic_reels"
      });
      videoSrc = result.secure_url;
      
      // Cleanup temp file
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error(error);
      res.status(500);
      throw new Error('Cloudinary upload failed');
    }
  }

  if (!videoSrc) {
    res.status(400);
    throw new Error('Video source or file is required');
  }

  const newReel = new Reel({
    title: req.body.title,
    caption: req.body.caption,
    insight: req.body.insight,
    actionItem: req.body.actionItem,
    category: req.body.category,
    relatedModule: req.body.relatedModule,
    videoSrc: videoSrc
  });

  const createdReel = await newReel.save();
  res.status(201).json(createdReel);
});

// @desc    Update a reel
// @route   PUT /api/v1/reels/:id
// @access  Private/Admin
export const updateReel = asyncHandler(async (req: Request, res: Response) => {
  const reel = await Reel.findById(req.params.id);

  if (reel) {
    let videoSrc = req.body.videoSrc || reel.videoSrc;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "video",
          folder: "vedic_reels"
        });
        videoSrc = result.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('Cloudinary upload failed');
      }
    }

    reel.title = req.body.title || reel.title;
    reel.caption = req.body.caption || reel.caption;
    reel.insight = req.body.insight || reel.insight;
    reel.actionItem = req.body.actionItem || reel.actionItem;
    reel.category = req.body.category || reel.category;
    reel.relatedModule = req.body.relatedModule || reel.relatedModule;
    reel.videoSrc = videoSrc;

    const updatedReel = await reel.save();
    res.json(updatedReel);
  } else {
    res.status(404);
    throw new Error('Reel not found');
  }
});

// @desc    Delete a reel
// @route   DELETE /api/v1/reels/:id
// @access  Private/Admin
export const deleteReel = asyncHandler(async (req: Request, res: Response) => {
  const reel = await Reel.findByIdAndDelete(req.params.id);
  if (reel) {
    res.json({ message: 'Reel removed' });
  } else {
    res.status(404);
    throw new Error('Reel not found');
  }
});

import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  caption: { type: String, required: true },
  insight: { type: String, required: true },
  actionItem: { type: String, required: true },
  category: { type: String, required: true },
  relatedModule: { type: String, required: true },
  videoSrc: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Reel', reelSchema);

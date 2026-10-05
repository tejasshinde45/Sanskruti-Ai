import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { type: String, enum: ['Story', 'Scripture', 'Quiz'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  proposedChanges: { type: Object, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminFeedback: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Contribution', contributionSchema);

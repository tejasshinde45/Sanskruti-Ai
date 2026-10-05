import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  themeColor: { type: String, default: 'from-amber-600 to-yellow-800' },
  badgeReward: {
    name: { type: String, default: 'Scholar of Dharma' },
    icon: { type: String, default: 'Award' },
    color: { type: String, default: 'from-amber-400 to-amber-600' }
  },
  questions: [{
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correct: { type: Number, required: true },
    explanation: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);

import mongoose from 'mongoose';

const festivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  month: { type: String, required: true },
  category: { type: String, required: true },
  regions: { type: [String], required: true },
  description: { type: String, required: true },
  significance: { type: String, required: true },
  rituals: { type: [String], required: true },
  foods: { type: [String], required: true },
  colors: { type: [String], required: true },
  mythology: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Festival', festivalSchema);

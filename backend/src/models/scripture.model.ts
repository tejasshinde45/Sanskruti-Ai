import mongoose from 'mongoose';

const scriptureSchema = new mongoose.Schema({
  sanskrit: { type: String, required: true },
  transliteration: { type: String, required: true },
  source: { type: String, required: true },
  chapter: { type: String, required: true },
  verse: { type: String, required: true },
  explanations: {
    basic: { type: String, required: true },
    deep: { type: String, required: true },
    spiritual: { type: String, required: true },
  }
}, { timestamps: true });

export default mongoose.model('Scripture', scriptureSchema);

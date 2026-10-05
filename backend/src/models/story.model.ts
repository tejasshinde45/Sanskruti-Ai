import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  type: { type: String, enum: ['content', 'question', 'explanation'], required: true },
  text: { type: String, required: function(this: any) { return this.type === 'content' || this.type === 'explanation'; } },
  image: { type: String },
  question: { type: String, required: function(this: any) { return this.type === 'question'; } },
  options: { type: [String], required: function(this: any) { return this.type === 'question'; } },
  correct: { type: Number, required: function(this: any) { return this.type === 'question'; } },
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  slides: { type: [slideSchema], required: true },
}, { timestamps: true });

export default mongoose.model('Story', storySchema);

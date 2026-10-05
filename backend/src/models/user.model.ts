import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user', 'contributor', 'admin'], default: 'user' },
  points: { type: Number, default: 0 },
  shlokasRead: { type: Number, default: 0 },
  quizzesCompleted: { type: Number, default: 0 },
  quizzesMastered: { type: [String], default: [] },
  mapLocationsExplored: { type: Number, default: 0 },
  storiesCompleted: { type: Number, default: 0 },
  reelsWatched: { type: Number, default: 0 },
  reelsSaved: { type: [String], default: [] },
  streak: { type: Number, default: 1 },
  exploredModules: {
    scripture: { type: Number, default: 0 },
    festivals: { type: Number, default: 0 },
    stories: { type: Number, default: 0 },
    quizzes: { type: Number, default: 0 },
  }
}, { timestamps: true });

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);

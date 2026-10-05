import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from './src/models/story.model';

dotenv.config();

const testCount = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const count = await Story.countDocuments();
  const allStories = await Story.find({}, 'title');
  console.log("Total Count:", count);
  console.log("Titles:", allStories.map(s => s.title));
  process.exit();
};

testCount();

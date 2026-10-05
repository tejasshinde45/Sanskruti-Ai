import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Reel from '../src/models/reel.model';
import path from 'path';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const dbURI = process.env.MONGODB_URI || 'your mongo url';

const reelsDatabase = [
  { title: "What is Dharma?", caption: "Doing the right thing even when it's hard", insight: "Dharma is not just religion; it is your cosmic duty and the path of righteousness that sustains the universe.", actionItem: "Find one area in your life today where you can choose the harder 'right' over the easy 'wrong'.", category: "Philosophy", relatedModule: "storyverse", videoSrc: "/reels/reel1.mp4" },
  { title: "The Power of Karma", caption: "Every action echoes in eternity", insight: "Your thoughts and intents shape your karma just as much as your physical actions do. Purify your intent.", actionItem: "Perform an act of kindness today without expecting any recognition or reward.", category: "Wisdom", relatedModule: "scripture", videoSrc: "/reels/reel2.mp4" },
  { title: "Understanding Om", caption: "The sound of the universe itself", insight: "Om (Aum) is the primordial vibration that connects all living beings. Chanting it brings the mind into absolute focus.", actionItem: "Sit in silence for two minutes, close your eyes, and take deep breaths while chanting Om.", category: "Meditation", relatedModule: "knowledge", videoSrc: "/reels/reel3.mp4" },
  { title: "The Gita in Battle", caption: "Focusing amidst chaos", insight: "Arjuna learned to detach from the outcome of the battle, focusing solely on performing his duty masterfully.", actionItem: "Identify a stressful task you have today. Do it without worrying about the final outcome.", category: "Bhagavad Gita", relatedModule: "scripture", videoSrc: "/reels/reel4.mp4" },
  { title: "Diwali Significance", caption: "Light over darkness", insight: "Lighting the Diya represents the inner light that protects us from spiritual darkness.", actionItem: "Light a candle or lamp today and set an intention for inner peace.", category: "Festivals", relatedModule: "festivals", videoSrc: "/reels/reel5.mp4" }
];

const seed = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected for Reels...');
        
        await Reel.deleteMany({});
        
        for (const reel of reelsDatabase) {
            console.log(`Uploading ${reel.title} to Cloudinary...`);
            const filePath = path.join(__dirname, '../../public', reel.videoSrc);
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: "video",
                folder: "vedic_reels"
            });
            console.log(`Uploaded! URL: ${result.secure_url}`);
            
            const newReel = new Reel({ ...reel, videoSrc: result.secure_url });
            await newReel.save();
        }
        console.log('Reels seeded successfully!');
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
seed();

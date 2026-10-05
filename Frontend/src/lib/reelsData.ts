// This serves as our local JSON DB for Reels until switched to Backend.
// Videos should be placed in `public/reels/reel1.mp4` etc.
// For testing purposes before you place your videos, these fallback to external nature MP4s.

export interface Reel {
  id: string;
  title: string;
  caption: string;
  insight: string;
  actionItem: string;
  category: string;
  relatedModule: string;
  videoSrc: string;
}

export const reelsDatabase: Reel[] = [
  {
    id: "r1",
    title: "What is Dharma?",
    caption: "Doing the right thing even when it's hard",
    insight: "Dharma is not just religion; it is your cosmic duty and the path of righteousness that sustains the universe.",
    actionItem: "Find one area in your life today where you can choose the harder 'right' over the easy 'wrong'.",
    category: "Philosophy",
    relatedModule: "storyverse",
    videoSrc: "/reels/reel1.mp4"
  },
  {
    id: "r2",
    title: "The Power of Karma",
    caption: "Every action echoes in eternity",
    insight: "Your thoughts and intents shape your karma just as much as your physical actions do. Purify your intent.",
    actionItem: "Perform an act of kindness today without expecting any recognition or reward.",
    category: "Wisdom",
    relatedModule: "scripture",
    videoSrc: "/reels/reel2.mp4"
  },
  {
    id: "r3",
    title: "Understanding Om",
    caption: "The sound of the universe itself",
    insight: "Om (Aum) is the primordial vibration that connects all living beings. Chanting it brings the mind into absolute focus.",
    actionItem: "Sit in silence for two minutes, close your eyes, and take deep breaths while chanting Om.",
    category: "Meditation",
    relatedModule: "knowledge",
    videoSrc: "/reels/reel3.mp4"
  },
  {
    id: "r4",
    title: "The Gita in Battle",
    caption: "Focusing amidst chaos",
    insight: "Arjuna learned to detach from the outcome of the battle, focusing solely on performing his duty masterfully.",
    actionItem: "Identify a stressful task you have today. Do it without worrying about the final outcome.",
    category: "Bhagavad Gita",
    relatedModule: "scripture",
    videoSrc: "/reels/reel4.mp4"
  },
  {
    id: "r5",
    title: "Diwali Significance",
    caption: "Light over darkness",
    insight: "Lighting the Diya represents the inner light that protects us from spiritual darkness.",
    actionItem: "Light a candle or lamp today and set an intention for inner peace.",
    category: "Festivals",
    relatedModule: "festivals",
    videoSrc: "/reels/reel5.mp4"
  }
];

// Helper to simulate API delay
export const getLocalReels = async (): Promise<Reel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reelsDatabase);
    }, 500);
  });
};

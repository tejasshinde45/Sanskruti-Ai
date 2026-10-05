import { getAllScriptures, getScriptureById as localGetScripture } from './scriptureData';
import { getAllFestivals } from './festivalData';
import { masterQuizzes } from './quizData';
import { reelsDatabase } from './reelsData';
import { storyDatabase } from './storyData';

// Simulated delay helper for realistic loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Scriptures
export const fetchScriptures = async () => {
  await delay(300);
  return getAllScriptures();
};

export const fetchScriptureById = async (id: string) => {
  await delay(300);
  return localGetScripture(id);
};

// Festivals
export const fetchFestivals = async () => {
  await delay(300);
  return getAllFestivals();
};

// Quizzes
export const fetchQuizzes = async (category?: string, difficulty?: string) => {
  await delay(300);
  let results = [...masterQuizzes];
  if (category) {
    results = results.filter(q => q.id === category || q.title.toLowerCase().includes(category.toLowerCase()));
  }
  return results;
};

// Stories from Database
export const fetchStories = async () => {
  const res = await fetch('/api/v1/stories');
  if (!res.ok) throw new Error('Failed to fetch stories');
  return res.json();
};

export const fetchStoryById = async (id: string) => {
  const res = await fetch(`/api/v1/stories/${id}`);
  if (!res.ok) throw new Error('Failed to fetch story');
  return res.json();
};

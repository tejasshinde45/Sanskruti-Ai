import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import Scripture from './models/scripture.model';
import Festival from './models/festival.model';
import Quiz from './models/quiz.model';
import Story from './models/story.model';
import Reel from './models/reel.model';

import { scriptureDatabase } from '../../src/lib/scriptureData';
import { festivalDatabase } from '../../src/lib/festivalData';
import { quizDatabase } from '../../src/lib/quizData';
import { reelsDatabase } from '../../src/lib/reelsData';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Scripture.deleteMany();
    await Festival.deleteMany();
    await Quiz.deleteMany();
    await Story.deleteMany();
    await Reel.deleteMany();

    const storyData = [
  {
    title: "The Battle of Kurukshetra",
    category: "Mahabharata",
    difficulty: "advanced",
    slides: [
      {
        type: "content",
        text: "The epic war of Kurukshetra was not just a battle for a throne; it was the ultimate clash of Dharma (righteousness) and Adharma (unrighteousness). Millions of warriors gathered on the sacred plains. The air was thick with the blare of conch shells and the thunder of galloping horses. At the center of it all stood the majestic, golden chariot of Arjuna, driven by Lord Krishna himself, radiating an awe-inspiring celestial aura.",
        image: "/story_images/kurukshetra.png"
      },
      {
        type: "content",
        text: "Before the first arrow was drawn, Arjuna's mighty heart sank. Looking across the battlefield, he saw not enemies, but his beloved grandfather Bhishma, his revered guru Drona, and his cousins, the Kauravas. His bow, the divine Gandiva, slipped from his trembling hands. Overwhelmed by sorrow and confusion, Arjuna sank into his chariot, crippled by moral dilemma. How could he slay his own blood for a kingdom?",
      },
      {
        type: "question",
        question: "When Arjuna was overcome with grief, what specific text did Lord Krishna recite to guide him towards his duty?",
        options: [
          "The Ramayana",
          "The Bhagavad Gita",
          "The Rig Veda",
          "The Upanishads"
        ],
        correct: 1
      },
      {
        type: "explanation",
        text: "Correct! The Bhagavad Gita, consisting of 700 verses, was spoken by Lord Krishna to Arjuna on the battlefield of Kurukshetra. It forms the core spiritual philosophy of Hinduism, emphasizing self-realization, duty (Dharma), and detachment from the fruits of actions."
      },
      {
        type: "content",
        text: "To dispel Arjuna's doubts, Lord Krishna revealed his Vishwaroopa—the terrifying yet mesmerizing Cosmic Form. An infinite expanse containing all universes, all timelines, holding thousands of dazzling weapons and faces blazing like a thousand suns. Arjuna witnessed the absolute reality: that the mortal bodies are temporary, but the soul is eternal, immutable, and indestructible.",
        image: "/story_images/vishwaroopa.png"
      },
      {
        type: "question",
        question: "What core philosophy did Krishna teach Arjuna about actions and their outcomes?",
        options: [
          "Expect extreme rewards from your actions.",
          "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
          "Fate is fixed, so you do not need to take any action at all.",
          "Only fight for material gains and the preservation of bloodlines."
        ],
        correct: 1
      },
      {
        type: "explanation",
        text: "Exactly. The profound principle of 'Nishkama Karma'—action without selfish desire for the results—is central to Krishna's teachings. 'Karmanye vadhikaraste Ma Phaleshu Kadachana' empowers you to give your 100% effort to your duty while letting go of anxiety about success or failure."
      }
    ]
  },
  {
    title: "The Vanvasa of Lord Rama",
    category: "Ramayana",
    difficulty: "intermediate",
    slides: [
      {
        type: "content",
        text: "Following the promise made by his father, King Dasharatha, Maryada Purushottam Lord Rama willingly accepted profound hardship over the royal throne of Ayodhya. Accompanied by his devoted wife Mata Sita and loyal brother Lakshmana, Rama left the comforts of the majestic palace to embrace a fourteen-year exile (Vanvasa) in the fierce, untamed jungles of Dandakaranya.",
        image: "/story_images/rama.png"
      },
      {
        type: "content",
        text: "Life in the mystical yet perilous Dandakaranya forest tested their resilience. Walking barefoot through thorny paths, sleeping on the rugged earth, and surviving on forest fruits, Rama and Sita displayed unshakeable equanimity. Rama’s glowing presence, wielding his divine bow, brought peace to fearful sages and terror to demonic entities terrorizing the holy lands.",
      },
      {
        type: "question",
        question: "Why did Lord Rama accept the exile without any protest?",
        options: [
          "He was afraid of a rebellion by his brother Bharata.",
          "To uphold his father's vow and prioritize Dharma and familial duty over ambition.",
          "Because the citizens of Ayodhya demanded his exile.",
          "He wanted to conquer the southern kingdoms secretly."
        ],
        correct: 1
      },
      {
        type: "explanation",
        text: "Well done! Rama epitomizes Dharma. He sacrificed unquestioned wealth and supreme power simply to protect the honor of his father's words given to Queen Kaikeyi. His choice is the highest example of putting righteousness and duty before personal desires."
      },
      {
        type: "content",
        text: "After 14 grueling years, which included the abduction of Sita, forming an army of Vanaras, building a bridge across the ocean, and the colossal war against the demon king Ravana, Rama finally returned to Ayodhya. His return marked the triumph of light over dark, truth over falsehood, and Dharma over Adharma. The entire city of Ayodhya was lit up with millions of glowing diyas in an epic Deepotsav celebration.",
        image: "/story_images/ayodhya.png"
      },
      {
        type: "question",
        question: "The grand celebration marking Lord Rama's return to Ayodhya is commemorated as which major festival today?",
        options: [
          "Maha Shivaratri",
          "Holi",
          "Diwali (Deepavali)",
          "Navratri"
        ],
        correct: 2
      },
      {
        type: "explanation",
        text: "Spot on! Diwali, the festival of lights, symbolizes the spiritual victory of light over darkness, good over evil, and knowledge over ignorance. To this day, millions light lamps recreating the joyous Deepotsav of Ayodhya's citizens welcoming their beloved King back."
      }
    ]
  }
];

    const formattedScriptures = scriptureDatabase.map((s: any) => ({
      sanskrit: s.sanskrit,
      transliteration: s.transliteration,
      source: s.source,
      chapter: s.chapter,
      verse: s.verse,
      explanations: s.explanations
    }));

    const formattedFestivals = festivalDatabase.map((f: any) => ({
      name: f.name,
      date: f.date,
      month: f.month,
      category: f.category,
      regions: f.regions,
      description: f.description,
      significance: f.significance,
      rituals: f.rituals,
      foods: f.foods,
      colors: f.colors,
      mythology: f.mythology
    }));

    const formattedQuizzes = quizDatabase.map((q: any) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
      category: q.category,
      explanation: q.explanation
    }));

    await Scripture.insertMany(formattedScriptures);
    await Festival.insertMany(formattedFestivals);
    await Quiz.insertMany(formattedQuizzes);
    await Story.insertMany(storyData);
    await Reel.insertMany(reelsDatabase.map(reel => ({
      title: reel.title,
      caption: reel.caption,
      insight: reel.insight,
      actionItem: reel.actionItem,
      category: reel.category,
      relatedModule: reel.relatedModule,
      videoSrc: reel.videoSrc
    })));

    console.log('Data Imported successfully into MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();

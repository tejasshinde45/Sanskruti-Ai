import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quiz from '../src/models/quiz.model';

dotenv.config();

const dbURI = process.env.MONGODB_URI || 'your mongo url';

const masterQuizzes = [
  {
    title: 'Samudra Manthan',
    description: 'The churning of the cosmic ocean and the battle for the nectar of immortality.',
    image: '/stories/samudra.png',
    themeColor: 'from-blue-500 to-cyan-600',
    badgeReward: { name: 'Nectar Keeper', icon: 'Droplet', color: 'from-blue-400 to-cyan-500' },
    questions: [
      { question: 'What was used as the churning rod during Samudra Manthan?', options: ['Mount Kailash', 'Mount Mandara', 'A giant trident', 'The World Tree'], correct: 1, explanation: 'The Devas and Asuras used Mount Mandara as the colossal churning rod for the cosmic ocean.' },
      { question: 'Who acted as the base to prevent the mountain from sinking?', options: ['Lord Brahma', 'Kurma (Tortoise Avatar of Vishnu)', 'Matsya (Fish Avatar)', 'Shesha Naga'], correct: 1, explanation: 'Lord Vishnu assumed the Kurma (giant tortoise) avatar to support Mount Mandara from sinking into the ocean.' },
      { question: 'What lethal poison emerged first during the churning?', options: ['Kalkuta / Halahala', 'Soma', 'Amrita', 'Kalakuta'], correct: 0, explanation: 'The deadly poison Halahala emerged first, threatening to destroy all creation until Lord Shiva consumed it.' },
      { question: 'Why is Lord Shiva called "Neelakantha"?', options: ['He wears a blue snake', 'He lives in the blue skies', 'His throat turned blue from holding the poison', 'He drank the blue nectar'], correct: 2, explanation: 'Parvati held his throat to stop the poison from entering his body, turning his neck permanently blue.' },
      { question: 'Who emerged holding the pot of Amrita (Nectar of Immortality)?', options: ['Goddess Lakshmi', 'Lord Indra', 'Lord Dhanvantari', 'Lord Agni'], correct: 2, explanation: 'Lord Dhanvantari, the divine physician, emerged at the very end bearing the golden pot of Amrita.' }
    ]
  },
  {
    title: 'The Ramayana',
    description: 'The epic journey of Lord Rama, his virtues, and the battle against Ravana.',
    image: 'https://images.unsplash.com/photo-1605845012588-755cc5d44849?q=80&w=1000',
    themeColor: 'from-orange-500 to-red-600',
    badgeReward: { name: 'Scholar of Ayodhya', icon: 'Sun', color: 'from-orange-400 to-red-500' },
    questions: [
      { question: 'Who composed the original Ramayana in Sanskrit?', options: ['Valmiki', 'Vyasa', 'Tulsidas', 'Kalidasa'], correct: 0, explanation: 'The sage Valmiki is revered as the Adi Kavi (first poet) and composed the original epic Ramayana.' },
      { question: 'What was the unbreakable bow wielded by Lord Shiva that Rama broke?', options: ['Gandiva', 'Pinaka', 'Sharanga', 'Vijaya'], correct: 1, explanation: 'Pinaka was the mighty bow of Lord Shiva which Rama strung and broke during Sita\'s Swayamvara.' },
      { question: 'Which incredibly devotion-filled bird attempted to stop Ravana from abducting Sita?', options: ['Garuda', 'Sampati', 'Jatayu', 'Kakasura'], correct: 2, explanation: 'Jatayu fought valiantly against Ravana to rescue Sita but was mortally wounded.' },
      { question: 'What is the name of Ravana\'s kingdom?', options: ['Kishkindha', 'Lanka', 'Ayodhya', 'Mathura'], correct: 1, explanation: 'Ravana ruled over the golden island kingdom of Lanka.' },
      { question: 'Which herb did Hanuman bring to save a dying Lakshmana?', options: ['Tulsi', 'Sanjeevani', 'Ashwagandha', 'Brahmi'], correct: 1, explanation: 'Hanuman lifted the entire Dronagiri mountain to bring the life-saving Sanjeevani herb.' }
    ]
  },
  {
    title: 'The Mahabharata',
    description: 'The colossal epic of duty, warfare, and cosmic philosophy in Kurukshetra.',
    image: '/stories/krishna.png',
    themeColor: 'from-amber-600 to-yellow-800',
    badgeReward: { name: 'Warrior of Dharma', icon: 'Shield', color: 'from-yellow-500 to-amber-700' },
    questions: [
      { question: 'Who dictated the Mahabharata while Sage Vyasa recited it?', options: ['Lord Vishnu', 'Lord Ganesha', 'Sanjaya', 'Narada'], correct: 1, explanation: 'Lord Ganesha agreed to write the epic on the condition that Vyasa dictates without pausing.' },
      { question: 'What is the true name of Bhishma, the grandsire of the Kurus?', options: ['Satyavati', 'Devavrata', 'Shantanu', 'Vichitravirya'], correct: 1, explanation: 'He was named Devavrata. He received the name "Bhishma" after taking a terrible (Bhishma) vow of celibacy.' },
      { question: 'What is the philosophical discourse delivered by Krishna to Arjuna known as?', options: ['Yoga Sutras', 'Bhagavad Gita', 'Upanishads', 'Vedanta'], correct: 1, explanation: 'The Bhagavad Gita is the 700-verse discourse given on the battlefield of Kurukshetra.' },
      { question: 'Who was the commander-in-chief of the Kaurava army for the first 10 days?', options: ['Karna', 'Drona', 'Bhishma', 'Shalya'], correct: 2, explanation: 'Bhishma led the Kaurava forces for the first 10 days until he was struck down by Arjuna.' },
      { question: 'What was the invincible weapon used by Ashwatthama at the war\'s end?', options: ['Pashupatastra', 'Brahmashirsha Astra', 'Narayanastra', 'Vajra'], correct: 1, explanation: 'Ashwatthama unleashed the catastrophic Brahmashirsha Astra against the Pandavas.' }
    ]
  },
  {
    title: 'Shiva Purana',
    description: 'Delve into the mystic lore, raw power, and deep meditation of Lord Shiva.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000',
    themeColor: 'from-indigo-600 to-purple-800',
    badgeReward: { name: 'Rudra Mystic', icon: 'Moon', color: 'from-indigo-400 to-purple-500' },
    questions: [
      { question: 'What is the sacred cosmic dance performed by Lord Shiva called?', options: ['Ras Leela', 'Tandava', 'Bharatanatyam', 'Kathak'], correct: 1, explanation: 'The Tandava is the fierce, cosmic dance of creation and destruction performed by Nataraja (Shiva).' },
      { question: 'What object does Shiva wear upon his matted hair?', options: ['The Sun', 'A Crescent Moon', 'A Lotus', 'A Diamond'], correct: 1, explanation: 'Shiva is adorned with a crescent moon (Chandrashekhara), representing control over time.' },
      { question: 'Which demon did Shiva defeat to save his devotee Markandeya from Death?', options: ['Tripurasura', 'Andhaka', 'Yama', 'Jalandhara'], correct: 2, explanation: 'Shiva appeared from the Lingam to kick Yama (Lord of Death) to protect the young Markandeya.' },
      { question: 'What was the name of Shiva\'s first wife who stepped into the sacrificial fire?', options: ['Parvati', 'Kali', 'Sati', 'Uma'], correct: 2, explanation: 'Sati sacrificed herself in the raging fire of Daksha\'s Yagna to protect her husband\'s honor.' },
      { question: 'What is the divine weapon most strongly associated with Lord Shiva?', options: ['Sudarshana Chakra', 'Kaumodaki', 'Trishula (Trident)', 'Gandiva'], correct: 2, explanation: 'The Trishula (Trident) symbolizes Shiva\'s control over the three gunas (Sattva, Rajas, Tamas).' }
    ]
  },
  {
    title: 'Prahlad & Hiranyakashipu',
    description: 'A tale of unyielding devotion and the fierce Narasimha avatar.',
    image: 'https://images.unsplash.com/photo-1604598114402-98651a0d3b6a?q=80&w=1000',
    themeColor: 'from-red-600 to-rose-900',
    badgeReward: { name: 'Unshakable Devotee', icon: 'ShieldAlert', color: 'from-red-500 to-rose-600' },
    questions: [
      { question: 'What did the demon king Hiranyakashipu demand from everyone in his empire?', options: ['Gold and taxes', 'To worship him as the Supreme God', 'To fight in his army', 'To abandon the Vedas'], correct: 1, explanation: 'Driven by ego, Hiranyakashipu banned the worship of Vishnu and ordered everyone to worship him.' },
      { question: 'Who was Prahlad entirely devoted to, despite his father\'s rage?', options: ['Lord Brahma', 'Lord Shiva', 'Lord Vishnu', 'Indra'], correct: 2, explanation: 'Prahlad was an absolute devotee of Lord Narayana (Vishnu) from the time he was in the womb.' },
      { question: 'Who tried to burn Prahlad alive but ended up burning instead?', options: ['Hiranyaksha', 'Holika', 'Rahu', 'Ketu'], correct: 1, explanation: 'Holika, Hiranyakashipu\'s sister, thought she was immune to fire, but her cloak protected Prahlad instead.' },
      { question: 'What condition of Hiranyakashipu’s boom did Narasimha bypass?', options: ['Not killed by man or beast', 'Not killed inside or outside', 'Not killed in day or night', 'All of the above'], correct: 3, explanation: 'Narasimha (half-man, half-lion) killed him on the threshold (neither inside nor outside), at twilight (neither day nor night).' },
      { question: 'Where did Narasimha emerge from to prove God is everywhere?', options: ['The sky', 'A vast ocean', 'A stone pillar', 'A magical fire'], correct: 2, explanation: 'When the demon smashed the pillar demanding to know if Vishnu was inside, Narasimha burst forth.' }
    ]
  }
];

const seed = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
        
        // Count existing to avoid double-seeding
        const count = await Quiz.countDocuments();
        if (count > 0) {
            console.log('Quizzes already exist, clearing and replacing to migrate...');
            await Quiz.deleteMany({});
        }
        
        await Quiz.insertMany(masterQuizzes);
        console.log('Quizzes seeded successfully!');
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}

seed();

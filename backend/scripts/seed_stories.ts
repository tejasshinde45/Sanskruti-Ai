import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import Story from './models/story.model';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Story.deleteMany();

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
  },
  {
    title: "The Faith of Prahlada and Lord Narasimha",
    category: "Puranas",
    difficulty: "beginner",
    slides: [
      {
        type: "content",
        text: "Long ago, the mighty demon king Hiranyakashipu secured a terrifying boon from Lord Brahma: he could not be killed by human or animal, day or night, inside or outside, nor by any weapon. Blinded by absolute power, he forced the entire universes to worship him as the supreme god, outright banning the name of Lord Vishnu.",
        image: "/story_images/narasimha.png"
      },
      {
        type: "content",
        text: "However, to his ultimate dismay, his own son, the pure-hearted child Prahlada, was born a fervent devotee of Lord Vishnu. Despite brutal punishments, being thrown into fire, and trampled by elephants, Prahlada repeatedly miraculously survived, endlessly chanting 'Om Namo Narayanaya'. His unshakeable devotion enraged the arrogant King to the point of madness."
      },
      {
        type: "question",
        question: "When the furious Hiranyakashipu pointed at a stone pillar and asked if Vishnu was inside it, what was Prahlada's profound reply?",
        options: [
          "Vishnu is only in the high heavens, far away.",
          "Vishnu is everywhere; He is in the pillar and even in the rustling of a leaf.",
          "I am Vishnu in human form.",
          "Vishnu has abandoned us."
        ],
        correct: 1
      },
      {
        type: "explanation",
        text: "Prahlada demonstrated the ultimate truth of omnipresence. The Supreme divine is not limited to temples or heavens; the Divine pervades every single atom of the multiverse. This absolute surrender and faith compelled the Lord to manifest violently."
      },
      {
        type: "content",
        text: "Smashing the pillar in absolute fury with his mace, Hiranyakashipu demanded proof. Instantly, the pillar exploded with cosmic force! Out emerged Lord Narasimha—a terrifying, majestic avatar that was neither fully human nor fully animal (half-man, half-lion). His roar shook the galaxies, bringing the tyrant king to his knees."
      },
      {
        type: "content",
        text: "Lord Narasimha seized the demon king and dragged him to the threshold of the palace (neither inside nor outside). Placing him on his lap (neither on earth nor sky), at exactly twilight (neither day nor night), He used his razor-sharp lion claws (not a weapon) to tear the tyrant apart, protecting Prahlada while honoring the exact terms of Brahma's boon!"
      }
    ]
  },
  {
    title: "The Flaming Pillar: The Grace of Mahadev",
    category: "Shiva Purana",
    difficulty: "advanced",
    slides: [
      {
        type: "content",
        text: "At the dawn of creation, an immense cosmic dispute erupted. Lord Brahma (the Creator) and Lord Vishnu (the Preserver) began debating over who was truly the supreme absolute source of the universe. The argument grew so fierce that universal destruction seemed imminent.",
        image: "/story_images/shiva_trinity.png"
      },
      {
        type: "content",
        text: "Suddenly, splitting the cosmos apart, an infinitely tall, blazing pillar of fire (the Jyotirlinga) manifested between them out of nowhere. It radiated heat like a trillion suns and seemed to stretch limitlessly upwards into the heavens and downwards into the abyssal netherworlds."
      },
      {
        type: "question",
        question: "How did Brahma and Vishnu attempt to find the limits of this mysterious flaming pillar?",
        options: [
          "Vishnu transformed into a Boar (Varaha) diving into the netherworlds, while Brahma turned into a Swan (Hamsa) soaring to the heavens.",
          "They combined their divine weapons to chop the pillar down.",
          "They mediated for a thousand years until it cooled.",
          "They ignored it and continued their cosmic debate."
        ],
        correct: 0
      },
      {
        type: "explanation",
        text: "Correct! To settle their debate, they decided that whoever found the end of the pillar first would be acknowledged as supreme. Vishnu assumed the massive Boar avatar, tearing deep into the roots of reality, while Brahma took the form of a Swan, flying faster than the speed of light towards the zenith."
      },
      {
        type: "content",
        text: "After eons of searching, Lord Vishnu returned, humbly admitting defeat; the depths were infinite. Brahma, too, grew exhausted but out of false pride, he presented a Ketaki flower falling from the sky as a false witness, lying that he had reached the glowing crown of the pillar."
      },
      {
        type: "content",
        text: "At that exact moment, the blazing pillar ruptured, and Lord Shiva (Mahadev) emerged in his true absolute form. He smiled kindly at Vishnu's honesty, declaring that Vishnu would be universally worshipped. However, enraged by Brahma's deception, Shiva proclaimed that Brahma would rarely have temples dedicated to him in the mortal realm. Shiva proved he was the infinite reality from which even time itself spawns."
      }
    ]
  },
  {
    title: "10 Avatars of Vishnu (Dashavatara)",
    category: "Puranas",
    difficulty: "intermediate",
    slides: [
      {
        type: "content",
        text: "'Yada Yada Hi Dharmasya, Glanir bhavati Bharata' — Whenever righteousness declines and darkness surges, Lord Vishnu incarnates on Earth to restore cosmic order. The Dashavatara outlines his massive, pivotal ten divine descents spanning across the cycle of Time (Yugas).",
        image: "/story_images/dashavatara.png"
      },
      {
        type: "question",
        question: "Which of the following describes the very first of the ten avatars, the Matsya (Fish) Avatar?",
        options: [
          "A fierce warrior destroying corrupt kings.",
          "A giant fish that saved the first man (Manu) and the Vedas from a total apocalyptic cosmic flood.",
          "A divine tortise holding a mountain on its back.",
          "A charming prince ruling Ayodhya."
        ],
        correct: 1
      },
      {
        type: "explanation",
        text: "Exactly. The Matsya avatar rescued King Satyavrata (Manu) and the Saptarishis (seven sages), securing the seed of life and spiritual knowledge (Vedas) in a massive boat away from the terrifying Pralaya (Cosmic Deluge)."
      },
      {
        type: "content",
        text: "Following Matsya, Vishnu became Kurma (the massive turtle supporting the ocean churning), Varaha (the Boar saving Earth from the depths), and Narasimha (half-man half-lion striking down tyranny). As humanity evolved, so did the avatars, transitioning to Vamana (the dwarf), Parashurama (the ferocious warrior with an axe), Ramachandra (the ideal king establishing Dharma), and Krishna (the grand cosmic statesman and beloved teacher)."
      },
      {
        type: "content",
        text: "Presently, we are in the era of the Buddha/Balarama, avatars of contemplation and inner truth. But moving forward into the shadows of the dark age (Kali Yuga), prophecies speak of the 10th and final avatar: Kalki. He is destined to arrive on a majestic white horse wielding a blazing sword like a comet, to cleanse the world of overwhelming corruption and initiate a brand-new Golden Age (Satya Yuga)."
      }
    ]
  },
  {
    title: "The Divine Establishment of Rameshwaram",
    category: "Ramayana",
    difficulty: "beginner",
    slides: [
      {
        type: "content",
        text: "After the mighty demon king Ravana abducted Mata Sita to the island fortress of Lanka, Lord Rama, Lakshmana, and the grand army of monkeys (Vanaras) marched aggressively south until they hit the massive barricade of the Indian Ocean. To be successful against the immensely powerful Ravana, Rama knew he needed divine backing.",
        image: "/story_images/rameshwaram.png"
      },
      {
        type: "question",
        question: "Before ordering the construction of the massive ocean bridge (Ram Setu), what specific act of worship did Lord Rama perform on the beach?",
        options: [
          "He sacrificed a hundred horses.",
          "He meditated on Lord Shiva and installed a holy Shiva Linga made of coastal sand to seek His blessings.",
          "He challenged the Sea God to a duel immediately.",
          "He built a massive temple of gold."
        ],
        correct: 1
      },
      {
        type: "explanation",
        text: "Rama, identifying as an ideal human, humbly displayed supreme devotion. He requested Hanuman to fetch an original Linga from the Himalayas. When Hanuman delayed, Mata Sita lovingly molded a Shiva Linga completely out of the ocean sand. Rama devoutly worshipped it right there on the beach!"
      },
      {
        type: "content",
        text: "Lord Shiva, known as Bholenath (the easily pleased god), was profoundly moved by Ram's tearful devotion. Shiva Himself manifested as a radiant Jyotirlinga (Pillar of Supreme Light) and blessed Rama with inevitable victory. He then triumphantly declared that whoever takes a sacred dip at this ocean spot and worships this very Linga will be freed from the gravest of sins."
      },
      {
        type: "content",
        text: "This profoundly holy site became the legendary 'Rameshwaram'—literally meaning 'The Lord of Rama'. It permanently stands as a striking symbol of the mutual love and respect between Lord Vishnu (Rama) and Lord Shiva, reinforcing that the divine forces are ultimately one unified energy!"
      }
    ]
  }
];

    await Story.insertMany(storyData);

    console.log('Story Data Imported successfully into MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();

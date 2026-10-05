export interface Festival {
  id: string;
  name: string;
  date: string;
  month: string;
  category: string;
  regions: string[];
  description: string;
  significance: string;
  rituals: string[];
  foods: string[];
  colors: string[];
  mythology: string;
}

export const festivalDatabase: Festival[] = [
  {
    id: '1',
    name: 'Diwali',
    date: 'October/November',
    month: 'Kartik (Hindu Calendar)',
    category: 'Major Festival',
    regions: ['All India', 'Nepal', 'Sri Lanka'],
    description: 'Festival of Lights celebrating the victory of light over darkness, good over evil.',
    significance: 'Commemorates Lord Rama\'s return to Ayodhya after 14 years of exile and victory over Ravana.',
    rituals: [
      'Cleaning and decorating homes',
      'Lighting diyas (oil lamps)',
      'Lakshmi Puja (worship of Goddess Lakshmi)',
      'Bursting firecrackers',
      'Exchanging gifts and sweets'
    ],
    foods: ['Ladoo', 'Barfi', 'Gulab Jamun', 'Namkeen', 'Chakli'],
    colors: ['Gold', 'Red', 'Orange', 'Yellow'],
    mythology: 'After defeating the demon king Ravana, Lord Rama returned to Ayodhya with Sita and Lakshmana. The people lit oil lamps to welcome them, creating a path of light.'
  },
  {
    id: '2',
    name: 'Holi',
    date: 'March',
    month: 'Phalguna (Hindu Calendar)',
    category: 'Major Festival',
    regions: ['North India', 'Nepal'],
    description: 'Festival of Colors celebrating spring, love, and the victory of good over evil.',
    significance: 'Celebrates the divine love of Radha and Krishna, and the burning of Holika.',
    rituals: [
      'Holika Dahan (bonfire night before)',
      'Playing with colored powders (gulal)',
      'Water balloon fights',
      'Singing and dancing',
      'Visiting friends and family'
    ],
    foods: ['Gujiya', 'Thandai', 'Puran Poli', 'Dahi Bhalla', 'Malpua'],
    colors: ['All colors - especially pink, yellow, green, blue'],
    mythology: 'Holika, sister of demon king Hiranyakashipu, tried to burn Prahlad (a devotee of Vishnu) but was burned herself, while Prahlad was saved by Lord Vishnu.'
  },
  {
    id: '3',
    name: 'Navratri',
    date: 'September/October',
    month: 'Ashwin (Hindu Calendar)',
    category: 'Major Festival',
    regions: ['Gujarat', 'Maharashtra', 'All India'],
    description: 'Nine nights celebrating the divine feminine energy through worship of Goddess Durga.',
    significance: 'Celebrates the victory of Goddess Durga over the buffalo demon Mahishasura.',
    rituals: [
      'Fasting for nine days',
      'Garba and Dandiya Raas dance',
      'Kanya Puja (worshipping young girls)',
      'Durga Puja pandals',
      'Reciting Durga Saptashati'
    ],
    foods: ['Sabudana Khichdi', 'Kuttu Puri', 'Singhare Atta Halwa', 'Fruit Chaat'],
    colors: ['Each day has specific colors - Day 1: Yellow, Day 2: Green, etc.'],
    mythology: 'Goddess Durga fought the demon Mahishasura for nine days and nights, finally defeating him on the tenth day (Vijayadashami).'
  },
  {
    id: '4',
    name: 'Pongal',
    date: 'January 14-17',
    month: 'Thai (Tamil Calendar)',
    category: 'Harvest Festival',
    regions: ['Tamil Nadu', 'Andhra Pradesh', 'Karnataka'],
    description: 'Four-day harvest festival thanking the Sun God for agricultural abundance.',
    significance: 'Marks the beginning of the Tamil month Thai and celebrates the harvest season.',
    rituals: [
      'Cooking Pongal (sweet rice dish) in new pots',
      'Decorating homes with Kolam (rangoli)',
      'Mattu Pongal (honoring cattle)',
      'Jallikattu (bull-taming sport)',
      'Kanu Pidi (feeding birds)'
    ],
    foods: ['Sakkarai Pongal (sweet)', 'Ven Pongal (savory)', 'Vadai', 'Payasam'],
    colors: ['Yellow', 'Green', 'Red'],
    mythology: 'Lord Indra once became arrogant, so Lord Krishna asked people to worship Govardhan Hill instead. This festival celebrates nature and agriculture.'
  },
  {
    id: '5',
    name: 'Eid ul-Fitr',
    date: 'Varies (Islamic Calendar)',
    month: 'Shawwal (Islamic Calendar)',
    category: 'Religious Festival',
    regions: ['All India', 'Global Muslim Community'],
    description: 'Festival marking the end of Ramadan, the Islamic holy month of fasting.',
    significance: 'Celebrates the completion of fasting and spiritual reflection during Ramadan.',
    rituals: [
      'Special Eid prayers at mosque',
      'Giving Zakat al-Fitr (charity)',
      'Wearing new clothes',
      'Exchanging gifts',
      'Preparing special meals'
    ],
    foods: ['Biryani', 'Sheer Khurma', 'Kebabs', 'Haleem', 'Dates'],
    colors: ['Green', 'White', 'Gold'],
    mythology: 'Commemorates the revelation of the Quran to Prophet Muhammad and celebrates the spiritual discipline of Ramadan.'
  }
];

export const getFestivalById = (id: string): Festival | undefined => {
  return festivalDatabase.find(festival => festival.id === id);
};

export const getFestivalsByRegion = (region: string): Festival[] => {
  return festivalDatabase.filter(festival => 
    festival.regions.some(r => r.toLowerCase().includes(region.toLowerCase()))
  );
};

export const getAllFestivals = (): Festival[] => {
  return festivalDatabase;
};

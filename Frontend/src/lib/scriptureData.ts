export interface Scripture {
  id: string;
  sanskrit: string;
  transliteration: string;
  source: string;
  chapter: string;
  verse: string;
  explanations: {
    basic: string;
    deep: string;
    spiritual: string;
  };
}

export const scriptureDatabase: Scripture[] = [
  {
    id: '1',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'Karmanye vadhikaraste ma phaleshu kadachana, Ma karma phala hetur bhurma te sangostva akarmani',
    source: 'Bhagavad Gita',
    chapter: 'Chapter 2',
    verse: 'Verse 47',
    explanations: {
      basic: 'You have the right to perform your duty, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results, and never be attached to not doing your duty.',
      deep: 'This verse teaches the principle of Nishkama Karma (selfless action). Lord Krishna advises Arjuna to focus on the action itself rather than worrying about success or failure. When we work without attachment to outcomes, we free ourselves from anxiety and disappointment. Our duty is to give our best effort; the results are beyond our control and should be left to divine will.',
      spiritual: 'At the deepest level, this shloka reveals the path to liberation (moksha). By performing our dharma without desire for personal gain, we transcend the ego and align with the cosmic order. The attachment to results creates karma that binds us to the cycle of birth and death. When action becomes an offering to the Divine, performed with complete detachment, it purifies the mind and leads to self-realization. This is the essence of Karma Yoga - the path of selfless service that transforms ordinary work into spiritual practice.'
    }
  },
  {
    id: '2',
    sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
    transliteration: 'Yogasthah kuru karmani sangam tyaktva dhananjaya, Siddhy-asiddhyoh samo bhutva samatvam yoga uchyate',
    source: 'Bhagavad Gita',
    chapter: 'Chapter 2',
    verse: 'Verse 48',
    explanations: {
      basic: 'Be steadfast in yoga, O Arjuna. Perform your duty and abandon all attachment to success or failure. Such evenness of mind is called yoga.',
      deep: 'This verse defines yoga as equanimity - the ability to remain balanced in all situations. Whether we succeed or fail, gain or lose, we should maintain inner peace. This mental equilibrium is not indifference but a state of conscious awareness where we accept all outcomes with grace. By cultivating this balance, we develop resilience and wisdom, no longer swayed by the ups and downs of life.',
      spiritual: 'True yoga is the union of the individual soul with the Supreme. This union is achieved through samatva (equanimity), which is the hallmark of an enlightened being. When the mind transcends dualities of pleasure-pain, success-failure, it rests in its true nature - pure consciousness. This state is not achieved through withdrawal from action but through performing all duties with complete detachment. The yogi sees the Divine in all outcomes, understanding that everything unfolds according to cosmic law. This wisdom transforms every action into meditation and every moment into an opportunity for spiritual growth.'
    }
  },
  {
    id: '3',
    sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
    transliteration: 'Shreyan swa-dharmo vigunah para-dharmat sv-anushthitat, Swa-dharme nidhanam shreyah para-dharmo bhayavahah',
    source: 'Bhagavad Gita',
    chapter: 'Chapter 3',
    verse: 'Verse 35',
    explanations: {
      basic: 'It is better to perform one\'s own duty imperfectly than to perform another\'s duty perfectly. It is better to die performing one\'s own duty; another\'s duty brings danger.',
      deep: 'This verse emphasizes the importance of following your own path (swadharma) rather than imitating others. Each person has unique talents, responsibilities, and life purposes based on their nature and circumstances. Trying to live someone else\'s life, no matter how admirable, leads to inner conflict and unhappiness. Your authentic path, even if challenging, brings fulfillment and growth. Comparing yourself to others or abandoning your true calling creates psychological and spiritual danger.',
      spiritual: 'Swadharma is the divine blueprint encoded in your soul. It represents your unique contribution to the cosmic order and your path to self-realization. When you align with your true nature and fulfill your destined role, you participate in the divine play (lila) harmoniously. Paradharma - following another\'s path - creates disharmony not just in your life but in the universal fabric. Even if your dharma seems less glamorous or more difficult, it is your sacred duty and the fastest route to liberation. Death while performing swadharma is glorious because it means you lived authentically; living inauthentically is a form of spiritual death.'
    }
  },
  {
    id: '4',
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    transliteration: 'Yada yada hi dharmasya glanir bhavati bharata, Abhyutthanam adharmasya tadatmanam srijamy aham',
    source: 'Bhagavad Gita',
    chapter: 'Chapter 4',
    verse: 'Verse 7',
    explanations: {
      basic: 'Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.',
      deep: 'This verse reveals the divine promise of intervention in times of crisis. When dharma (righteousness, cosmic order, moral law) weakens and adharma (unrighteousness, chaos) rises, the Divine manifests to restore balance. This can happen through avatars (divine incarnations), enlightened beings, or transformative events. It assures us that goodness ultimately prevails and that the universe has a self-correcting mechanism. During dark times, we should maintain faith that divine help will come.',
      spiritual: 'This is the doctrine of Avatar - the descent of the Divine into the material realm. But at a deeper level, it speaks to the eternal presence of Divine consciousness that awakens within humanity when needed most. The "I" that manifests is not just an external deity but the Supreme Self that exists within all beings. When collective consciousness falls into darkness, spiritual awakening emerges from within to restore dharma. This can manifest as a great teacher, a social movement, or an inner transformation in individuals. The verse also implies that each of us can become instruments of divine will, embodying dharma in our actions and inspiring others to do the same.'
    }
  },
  {
    id: '5',
    sanskrit: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु। मामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः॥',
    transliteration: 'Man-mana bhava mad-bhakto mad-yaji mam namaskuru, Mam evaishyasi yuktvaivam atmanam mat-parayanah',
    source: 'Bhagavad Gita',
    chapter: 'Chapter 9',
    verse: 'Verse 34',
    explanations: {
      basic: 'Always think of Me, become My devotee, worship Me, and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.',
      deep: 'This verse outlines the path of Bhakti Yoga - the yoga of devotion. Krishna instructs us to constantly remember the Divine, cultivate devotion, perform all actions as worship, and surrender with humility. By making the Divine the center of our thoughts and actions, we naturally move toward union with the Supreme. This is not about ritualistic worship alone but about transforming our entire consciousness to be God-centered. When every thought, word, and deed becomes an expression of love for the Divine, liberation is assured.',
      spiritual: 'The four practices mentioned - remembrance (man-mana), devotion (bhakti), worship (yajna), and surrender (namaskara) - represent the complete path of spiritual transformation. "Man-mana" means constant awareness of the Divine presence in all experiences. "Bhakti" is the heart\'s natural love flowing toward its source. "Yajna" transforms every action into a sacred offering. "Namaskara" is the ego\'s dissolution in recognition of the Supreme. Together, these practices purify the mind, open the heart, and reveal our true identity as one with the Divine. The promise "you will come to Me" is not about reaching a distant heaven but realizing that you have always been one with the Supreme - separation was only an illusion created by ignorance.'
    }
  }
];

export const getScriptureById = (id: string): Scripture | undefined => {
  return scriptureDatabase.find(scripture => scripture.id === id);
};

export const getAllScriptures = (): Scripture[] => {
  return scriptureDatabase;
};

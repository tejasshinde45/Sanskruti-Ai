import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Leaf, Music, Palette, Heart, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEO } from '@/hooks/useSEO';

const categories = [
  { id: 'ayurveda', label: 'Ayurveda', icon: Leaf, color: 'from-green-500 to-emerald-600' },
  { id: 'music', label: 'Music', icon: Music, color: 'from-purple-500 to-violet-600' },
  { id: 'art', label: 'Art', icon: Palette, color: 'from-pink-500 to-rose-600' },
  { id: 'yoga', label: 'Yoga', icon: Heart, color: 'from-orange-500 to-amber-600' },
  { id: 'philosophy', label: 'Philosophy', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
];

const capsules = {
  ayurveda: [
    {
      title: 'The Three Doshas',
      summary: 'Ayurveda identifies three fundamental energies (doshas) that govern our body and mind: Vata (air/space), Pitta (fire/water), and Kapha (earth/water). Understanding your dominant dosha helps in maintaining health through appropriate diet, lifestyle, and treatments.',
      keyPoints: ['Vata: Movement and creativity', 'Pitta: Transformation and metabolism', 'Kapha: Structure and stability'],
      application: 'Identify your dosha type through self-assessment and adjust your daily routine accordingly.'
    },
    {
      title: 'Dinacharya: Daily Routine',
      summary: 'Ayurveda emphasizes the importance of daily routines (Dinacharya) aligned with natural cycles. This includes waking before sunrise, tongue scraping, oil pulling, yoga, and eating meals at consistent times.',
      keyPoints: ['Wake at Brahma Muhurta (4-6 AM)', 'Practice self-care rituals', 'Eat according to digestive fire'],
      application: 'Start with one Ayurvedic practice and gradually build a complete routine.'
    }
  ],
  music: [
    {
      title: 'Ragas and Emotions',
      summary: 'Indian classical music uses Ragas - melodic frameworks that evoke specific emotions and are associated with particular times of day and seasons. Each Raga has a unique combination of notes that creates a distinct mood.',
      keyPoints: ['Morning Ragas: Energizing', 'Evening Ragas: Calming', 'Night Ragas: Contemplative'],
      application: 'Listen to appropriate Ragas during different times for emotional balance.'
    },
    {
      title: 'The Seven Swaras',
      summary: 'The foundation of Indian music lies in seven basic notes (Swaras): Sa, Re, Ga, Ma, Pa, Dha, Ni. These correspond to the Western do, re, mi, fa, sol, la, ti and are believed to resonate with the seven chakras.',
      keyPoints: ['Each Swara affects specific chakras', 'Combinations create different moods', 'Practice develops inner harmony'],
      application: 'Practice singing or listening to Swaras for meditation and healing.'
    }
  ],
  art: [
    {
      title: 'Madhubani Painting',
      summary: 'Originating from Bihar, Madhubani art uses natural dyes and pigments with distinctive geometric patterns. Traditionally created by women, these paintings depict mythology, nature, and social events with vibrant colors.',
      keyPoints: ['Uses natural materials', 'Symbolic patterns', 'Passed through generations'],
      application: 'Try creating simple Madhubani patterns as a meditative art practice.'
    }
  ],
  yoga: [
    {
      title: 'The Eight Limbs of Yoga',
      summary: 'Patanjali\'s Yoga Sutras describe eight limbs (Ashtanga): Yama (ethics), Niyama (self-discipline), Asana (postures), Pranayama (breath control), Pratyahara (sense withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (enlightenment).',
      keyPoints: ['Holistic spiritual practice', 'Progressive stages', 'Beyond physical postures'],
      application: 'Focus on one limb at a time to deepen your yoga practice.'
    }
  ],
  philosophy: [
    {
      title: 'The Four Purusharthas',
      summary: 'Hindu philosophy identifies four goals of human life: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation). Balancing these four creates a fulfilling life.',
      keyPoints: ['Dharma: Living ethically', 'Artha: Material success', 'Kama: Sensory enjoyment', 'Moksha: Spiritual freedom'],
      application: 'Reflect on how you balance these four aspects in your life.'
    }
  ]
};

export default function KnowledgeCapsule() {
  const [selectedCategory, setSelectedCategory] = useState('ayurveda');

  useSEO({
    title: 'Knowledge Capsules',
    description: 'Bite-sized insights on Indian art, philosophy, medicine, and culture. Learn about Ayurveda, Yoga, Music, and more.',
    keywords: 'ayurveda, yoga, indian music, indian philosophy, cultural knowledge, micro-learning'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md mb-2">
          Wisdom Vault
        </Badge>
        <h1 className="text-4xl font-bold cinzel-text text-foreground mb-2">Knowledge Capsule Generator</h1>
        <p className="text-muted-foreground">Bite-sized insights on Indian art, philosophy, medicine, and culture</p>
      </motion.div>

      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-8 glass-panel border-primary/20 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl pointer-events-none opacity-50"></div>

          <h2 className="text-2xl font-bold cinzel-text text-foreground mb-6 flex items-center gap-3 relative z-10">
            <Lightbulb className="w-8 h-8 text-primary" />
            Choose a Topic
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 flex flex-col items-center justify-center gap-3 ${selectedCategory === category.id
                      ? `bg-primary border-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]`
                      : 'bg-card/50 border-border/50 text-muted-foreground hover:bg-card hover:border-primary/50 hover:text-foreground hover:shadow-lg'
                    }`}
                >
                  <Icon className={`w-8 h-8 ${selectedCategory === category.id ? 'text-primary-foreground' : 'text-primary'}`} />
                  <p className="text-center font-semibold">
                    {category.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Capsules Display */}
      <div className="space-y-6">
        {capsules[selectedCategory as keyof typeof capsules].map((capsule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-8 glass-panel border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary/10 transition-colors"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-primary/20 text-primary border-primary/40 backdrop-blur-md mb-3 px-3 py-1 text-sm font-semibold">
                      {categories.find(c => c.id === selectedCategory)?.label}
                    </Badge>
                    <h3 className="text-3xl font-bold cinzel-text text-foreground group-hover:text-primary transition-colors">{capsule.title}</h3>
                  </div>
                  <div className="p-3 bg-card/50 rounded-full border border-border group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                    <Lightbulb className="w-8 h-8 text-primary shadow-sm" />
                  </div>
                </div>

                <div className="p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border/50 text-lg">
                  <p className="text-muted-foreground leading-relaxed">{capsule.summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-theme-gradient-secondary rounded-xl shadow-inner border border-secondary/20 hover:border-secondary/40 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2 cinzel-text text-xl">
                        <BookOpen className="w-5 h-5 text-secondary" />
                        Key Points
                      </h4>
                      <ul className="space-y-3">
                        {capsule.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/90">
                            <span className="text-secondary font-bold text-lg mt[-2px]">•</span>
                            <span className="leading-relaxed font-light">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-card/50 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors flex flex-col justify-center">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2 cinzel-text text-xl">
                      <Lightbulb className="w-5 h-5 text-accent" />
                      Practical Application
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-lg">{capsule.application}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

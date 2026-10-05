import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Frown, Meh, Zap, BookHeart, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '@/hooks/useSEO';

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: 'from-yellow-400 to-orange-400' },
  { id: 'sad', label: 'Sad', icon: Frown, color: 'from-blue-400 to-indigo-400' },
  { id: 'anxious', label: 'Anxious', icon: Zap, color: 'from-purple-400 to-pink-400' },
  { id: 'neutral', label: 'Neutral', icon: Meh, color: 'from-gray-400 to-gray-500' },
  { id: 'curious', label: 'Curious', icon: BookHeart, color: 'from-green-400 to-teal-400' },
];

const recommendations = {
  happy: {
    story: 'The Story of Lord Krishna and the Butter',
    value: 'Joy and Playfulness',
    description: 'When Krishna was a child, he loved butter so much that he would steal it from every house. His playful nature reminds us that joy is found in simple pleasures and that maintaining childlike wonder enriches our lives.',
    practice: 'Practice gratitude for small joys in your life today.',
    quote: 'आनन्दो ब्रह्म - Ananda is Brahman (Bliss is the ultimate reality)'
  },
  sad: {
    story: 'Arjuna\'s Despair and Krishna\'s Wisdom',
    value: 'Resilience and Hope',
    description: 'When Arjuna felt overwhelmed with grief before the battle, Krishna taught him that sorrow is temporary and that our true self is eternal. This wisdom helps us understand that difficult times pass and growth emerges from challenges.',
    practice: 'Meditate on the impermanence of emotions and situations.',
    quote: 'योगस्थः कुरु कर्माणि - Established in yoga, perform actions'
  },
  anxious: {
    story: 'The Calm of Buddha Under the Bodhi Tree',
    value: 'Inner Peace and Stillness',
    description: 'Despite facing temptations and fears, Buddha remained calm and centered under the Bodhi tree until he attained enlightenment. This teaches us that external chaos cannot disturb us when we cultivate inner stillness.',
    practice: 'Practice deep breathing and mindfulness for 10 minutes.',
    quote: 'शान्तिः शान्तिः शान्तिः - Peace, peace, peace'
  },
  neutral: {
    story: 'The Balanced Life of Sage Vyasa',
    value: 'Balance and Equanimity',
    description: 'Sage Vyasa lived a life of perfect balance - engaged in worldly duties yet deeply spiritual. He teaches us that true wisdom lies in maintaining equilibrium in all situations.',
    practice: 'Reflect on areas of your life that need more balance.',
    quote: 'समत्वं योग उच्यते - Equanimity is called yoga'
  },
  curious: {
    story: 'Nachiketa\'s Quest for Truth',
    value: 'Knowledge and Wisdom',
    description: 'Young Nachiketa\'s fearless questioning of Yama (the god of death) about the nature of life and death exemplifies the power of curiosity. His quest led to profound wisdom shared in the Katha Upanishad.',
    practice: 'Ask yourself one deep question about life today and contemplate it.',
    quote: 'तमेव विदित्वा अतिमृत्युमेति - Knowing That alone, one transcends death'
  }
};

export default function CulturalRecommender() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useSEO({
    title: 'Cultural Recommender',
    description: 'Get personalized spiritual and cultural wisdom based on your mood and interests. AI-powered recommendations from ancient texts.',
    keywords: 'spiritual advice, cultural wisdom, ai recommendations, mental peace, hindu philosophy'
  });

  const recommendation = selectedMood ? recommendations[selectedMood as keyof typeof recommendations] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md mb-2">
          Personal Guidance
        </Badge>
        <h1 className="text-4xl font-bold cinzel-text text-foreground mb-2">Cultural Recommender & Wellness Coach</h1>
        <p className="text-muted-foreground">Get personalized wisdom based on your current mood and needs</p>
      </motion.div>

      {/* Mood Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-8 glass-panel border-primary/20 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <h2 className="text-2xl font-bold cinzel-text text-foreground mb-6 flex items-center gap-3 relative z-10">
            <Heart className="w-8 h-8 text-primary" />
            How are you feeling today?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <motion.div
                  key={mood.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setSelectedMood(mood.id)}
                    variant={selectedMood === mood.id ? "default" : "outline"}
                    className={`h-auto py-6 flex-col gap-2 w-full transition-all duration-300 border-2 ${selectedMood === mood.id
                      ? `bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)]`
                      : 'bg-card/50 text-muted-foreground border-border/50 hover:bg-card hover:border-primary/50 hover:text-foreground hover:shadow-lg'
                      }`}
                  >
                    <Icon className="w-8 h-8 mb-1" />
                    <span className="font-semibold">{mood.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Recommendation Display */}
      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-8 glass-panel border-primary/20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-primary/20 text-primary border-primary/40 backdrop-blur-md mb-4 px-3 py-1">
                    <Sparkles className="w-3 h-3 mr-2 inline" />
                    Recommended for You
                  </Badge>
                  <h3 className="text-3xl font-bold cinzel-text text-foreground leading-tight">{recommendation.story}</h3>
                  <p className="text-secondary font-semibold mt-3 flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5" />
                    Value: {recommendation.value}
                  </p>
                </div>
              </div>

              <div className="p-8 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-inner">
                <p className="text-muted-foreground leading-relaxed text-lg">{recommendation.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card/40 rounded-xl border border-primary/20 hover:border-primary/50 transition-colors group">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2 cinzel-text text-xl group-hover:text-primary transition-colors">
                    <Heart className="w-5 h-5 text-primary" />
                    Daily Practice
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{recommendation.practice}</p>
                </div>

                <div className="p-6 bg-theme-gradient-secondary rounded-xl shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all group-hover:bg-black/30"></div>
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2 cinzel-text text-xl relative z-10">
                    <BookHeart className="w-5 h-5 text-secondary" />
                    Sacred Quote
                  </h4>
                  <p className="text-white/90 sanskrit-text text-xl relative z-10 font-light tracking-wide">{recommendation.quote}</p>
                </div>
              </div>
            </div>
          </Card>

          <motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.05} className="cursor-grab active:cursor-grabbing">
            <Card className="p-6 glass-panel border-primary/20 bg-primary/5">
              <h3 className="font-bold text-foreground mb-4 cinzel-text text-xl">Additional Resources</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-6 flex-col gap-3 bg-card/50 hover:bg-primary/10 hover:text-primary border-border hover:border-primary/50 transition-all rounded-xl">
                  <BookHeart className="w-6 h-6" />
                  <span className="font-semibold">Related Stories</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex-col gap-3 bg-card/50 hover:bg-secondary/10 hover:text-secondary border-border hover:border-secondary/50 transition-all rounded-xl">
                  <Zap className="w-6 h-6" />
                  <span className="font-semibold">Meditation Guide</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex-col gap-3 bg-card/50 hover:bg-accent/10 hover:text-accent border-border hover:border-accent/50 transition-all rounded-xl">
                  <Heart className="w-6 h-6" />
                  <span className="font-semibold">Wellness Tips</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center p-12 glass-panel min-h-[400px] border-primary/20"
      >
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
            <Heart className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-bold cinzel-text text-foreground">Select Your Mood</h3>
            <p className="text-muted-foreground mt-3 max-w-sm mx-auto">Choose how you're feeling to receive personalized, culturally rich wisdom and recommendations.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

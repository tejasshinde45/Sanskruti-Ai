import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, Play, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { fetchStories } from '@/lib/api';
import StoryPlayer from '@/components/StoryPlayer';
import { useAuthStore } from '@/store/useAuthStore';
import { useSEO } from '@/hooks/useSEO';

export default function Storyverse() {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const { user } = useAuthStore();

  useSEO({
    title: 'Vedic Storyverse',
    description: 'Learn Dharma and Vedas through timeless interactive stories. Make choices aligning with Dharma and discover timeless wisdom.',
    keywords: 'vedic stories, hindu mythology stories, dharma choices, interactive epics, karma'
  });

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
  });

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'beginner': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'intermediate': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'advanced': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="space-y-2">
          <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 backdrop-blur-md mb-2">
            Interactive Learning
          </Badge>
          <h1 className="text-4xl font-bold cinzel-text text-foreground mb-2 flex items-center gap-3">
            <ScrollText className="w-8 h-8 text-amber-500" />
            Vedic Storyverse
          </h1>
          <p className="text-muted-foreground">Learn Dharma and Vedas through timeless interactive stories</p>
        </div>
      </motion.div>

      {/* Stories Grid */}
      {isLoading ? (
        <div className="text-center p-12 text-muted-foreground">Loading ancient scrolls...</div>
      ) : error ? (
        <div className="text-center p-12 text-destructive">Failed to unroll the scrolls. Please try again.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any, idx: number) => (
            <motion.div
              key={story._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
            >
              <Card className="p-1 glass-panel border-amber-500/30 hover:border-amber-400 shadow-xl hover:shadow-amber-500/20 transition-all duration-500 group cursor-pointer h-full flex flex-col relative overflow-hidden rounded-2xl" onClick={() => setActiveStoryId(story._id)}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-background to-background z-0"></div>
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                <div className="relative z-10 p-6 flex flex-col h-full bg-card/80 backdrop-blur-md rounded-xl">
                  
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-amber-950/50 text-amber-500 border-amber-500/50 uppercase tracking-widest text-xs font-semibold shadow-inner">
                    {story.category}
                  </Badge>
                  <Badge className={`uppercase tracking-wider text-[10px] ${getDifficultyColor(story.difficulty)}`}>
                    {story.difficulty}
                  </Badge>
                </div>

                  <div className="mb-6 flex-1 pt-4">
                    <h3 className="text-2xl font-bold cinzel-text bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-500 mb-2 drop-shadow-sm">
                      {story.title}
                    </h3>
                    <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                      Embark on an epic journey to experience this ancient authentic Vedic narrative. Make choices aligning with Dharma and discover timeless wisdom.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-amber-500/20 pt-4 mt-auto">
                    <span className="text-sm font-bold text-amber-500 flex items-center gap-2 drop-shadow-sm">
                      <CheckCircle className="w-4 h-4" />
                      +{((story.slides?.length || 0) * 5) + 20} XP
                    </span>
                    
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 ml-1 drop-shadow-md" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Story Player Modal */}
      <AnimatePresence>
        {activeStoryId && (
          <StoryPlayer 
            storyId={activeStoryId} 
            onClose={() => setActiveStoryId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

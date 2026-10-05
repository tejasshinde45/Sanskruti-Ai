import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Bookmark, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScriptureInput from '@/components/ScriptureInput';
import ExplanationDisplay from '@/components/ExplanationDisplay';
import VoicePlayer from '@/components/VoicePlayer';
import { useQuery } from '@tanstack/react-query';
import { fetchScriptures, fetchScriptureById } from '@/lib/api';
import { Scripture } from '@/lib/scriptureData';
import { useAuthStore } from '@/store/useAuthStore';
import { useSEO } from '@/hooks/useSEO';

export default function ScriptureExplainer() {
  const [selectedScriptureId, setSelectedScriptureId] = useState<string | null>(null);
  const [customScripture, setCustomScripture] = useState<any | null>(null);
  const [activeLevel, setActiveLevel] = useState<'basic' | 'deep' | 'spiritual'>('basic');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const { user, addXP } = useAuthStore();

  useSEO({
    title: 'Scripture Explainer',
    description: 'Explore the profound meanings of Hindu scriptures with AI-powered multi-level explanations. Uncover basic, deep, and spiritual insights.',
    keywords: 'hindu scriptures, bhagavad gita, upanishads, vedas, ai scripture explanation, spiritual learning'
  });

  const { data: scriptures = [], isLoading } = useQuery({
    queryKey: ['scriptures'],
    queryFn: fetchScriptures
  });

  const { data: selectedScripture } = useQuery({
    queryKey: ['scriptures', selectedScriptureId],
    queryFn: () => fetchScriptureById(selectedScriptureId!),
    enabled: !!selectedScriptureId
  });

  const filteredScriptures = scriptures.filter((s: Scripture) =>
    s.sanskrit.includes(searchQuery) ||
    s.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScriptureSelect = (scriptureId: string) => {
    setSelectedScriptureId(scriptureId);
    setCustomScripture(null);
    setActiveLevel('basic');
  };

  const handleCustomScriptureSubmit = (customScriptureData: any) => {
    setCustomScripture(customScriptureData);
    setSelectedScriptureId(null);
    setActiveLevel('basic');
  };

  const toggleBookmark = (id: string) => {
    setBookmarked(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] -mt-6 -mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 flex flex-col">
      {/* Immersive 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <iframe 
          src='https://my.spline.design/particlenebula-pIYdEyflVOGWsHOpCJWl38oj/' 
          frameBorder='0' 
          loading="lazy"
          title="3D Cosmic Particle Nebula"
          className="w-full h-[120%] object-cover opacity-50 -translate-y-10"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background/90"></div>
      </div>

      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8 flex flex-col items-center justify-start min-h-screen pt-[10vh]">
        {/* Header - Hides when compact to act like a search engine */}
        {!(selectedScripture || customScripture) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center gap-4 max-w-3xl w-full"
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1.5 text-sm uppercase tracking-widest shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
              Divine Wisdom
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold cinzel-text text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Scripture Explainer AI</h1>
            <p className="text-lg text-slate-300 max-w-xl font-light">Explore the timeless wisdom of sacred texts with multi-level, deeply insightful AI-powered explanations.</p>
          </motion.div>
        )}

        {/* Main Content Layout */}
        <div className="w-full flex flex-col gap-8 transition-all duration-700 ease-in-out relative z-20">
          
          {/* Centered Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            layout
            className="w-full"
          >
            <ScriptureInput 
              onSubmit={handleScriptureSelect} 
              onCustomSubmit={handleCustomScriptureSubmit} 
              compact={!!(selectedScripture || customScripture)}
            />
          </motion.div>

          {/* Explanation Display - Only shows when something is selected */}
          {(selectedScripture || customScripture) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-4xl mx-auto space-y-6"
            >
              <div className="flex gap-2 justify-end mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBookmark(selectedScripture?.id || customScripture?.id)}
                  className={`border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md transition-all ${bookmarked.includes(selectedScripture?.id || customScripture?.id) ? 'bg-primary/20 ring-1 ring-primary/50 text-primary border-primary/30' : ''}`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${bookmarked.includes(selectedScripture?.id || customScripture?.id) ? 'fill-primary' : ''}`} />
                  {bookmarked.includes(selectedScripture?.id || customScripture?.id) ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.05} className="cursor-grab active:cursor-grabbing w-full">
                <ExplanationDisplay 
                  scripture={selectedScripture || customScripture} 
                  activeLevel={activeLevel}
                  onLevelChange={setActiveLevel}
                />
              </motion.div>
              <VoicePlayer scripture={selectedScripture || customScripture} activeLevel={activeLevel} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

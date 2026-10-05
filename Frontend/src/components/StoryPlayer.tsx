import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, CheckCircle2, XCircle, Sparkles, Edit3 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchStoryById } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

interface StoryPlayerProps {
  storyId: string;
  onClose: () => void;
}

export default function StoryPlayer({ storyId, onClose }: StoryPlayerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [storyCompleted, setStoryCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editJson, setEditJson] = useState('');
  
  const { user, addXP, incrementStoriesCompleted } = useAuthStore();

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['stories', storyId],
    queryFn: () => fetchStoryById(storyId),
  });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Summoning ancient wisdom...</div>;
  if (error || !story) return <div className="p-8 text-center text-destructive">Failed to load the story.</div>;

  const slides = story.slides;
  const currentSlide = slides[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      finishStory();
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers
    setSelectedAnswer(optionIndex);
    
    const isCorrect = optionIndex === currentSlide.correct;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      addXP(10);
      toast.success('+10 XP for correct wisdom!');
    } else {
      toast.error('Not quite right. See the explanation next.');
    }
  };

  const finishStory = () => {
    if (!storyCompleted) {
      setStoryCompleted(true);
      incrementStoriesCompleted();
      toast.success('+20 XP! You have completed the story.', {
        icon: '🕉️',
      });
      setTimeout(() => onClose(), 1500);
    }
  };

  const handleProposeEdit = async () => {
    try {
      const parsed = JSON.parse(editJson);
      if (!parsed.title || !parsed.slides) throw new Error("Invalid structure");
      
      const res = await fetch('/api/v1/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          targetType: 'Story',
          targetId: storyId,
          proposedChanges: parsed
        })
      });

      if (res.ok) {
        toast.success("Contribution proposed! Pending royal approval.");
        addXP(25);
        setIsEditing(false);
      } else {
        toast.error("Failed to submit proposal.");
      }
    } catch (err) {
      toast.error("Invalid JSON format.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      <Card className="w-full max-w-5xl flex flex-col overflow-hidden shadow-2xl shadow-amber-900/50 border-amber-500/20 relative bg-zinc-950/80 backdrop-blur-md h-full max-h-[85vh] rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20 shrink-0 bg-gradient-to-r from-zinc-900/90 to-zinc-950/90">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400 drop-shadow-md" />
            <h3 className="text-xl font-bold cinzel-text bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-sm">{story.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {(user?.role === 'contributor' || user?.role === 'admin') && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 mr-4"
                onClick={() => {
                  setEditJson(JSON.stringify(story, null, 2));
                  setIsEditing(true);
                }}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Propose Fix
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-amber-500/20 text-muted-foreground hover:text-amber-400 transition-colors">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Edit Modal internal overlay */}
        {isEditing && (
          <div className="absolute inset-0 z-[60] bg-zinc-950/95 backdrop-blur-md flex flex-col p-6 overflow-hidden">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-emerald-400 font-bold cinzel-text text-xl">Propose Contribution</h3>
                <Button variant="ghost" onClick={() => setIsEditing(false)}><X className="w-5 h-5"/></Button>
             </div>
             <p className="text-sm text-muted-foreground mb-4">Directly modify the JSON below. Admin gets final approval.</p>
             <textarea 
                className="flex-1 w-full bg-black/50 border border-emerald-500/30 text-emerald-50 font-mono text-xs p-4 rounded-xl layout-scroll"
                value={editJson}
                onChange={e => setEditJson(e.target.value)}
             />
             <div className="mt-4 flex justify-end">
               <Button onClick={handleProposeEdit} className="bg-emerald-500 hover:bg-emerald-600 text-white">Submit Proposal For XP</Button>
             </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-secondary/20">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-0 relative layout-scroll flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full flex flex-col"
            >
              {currentSlide.type === 'content' && (
                <div className="w-full h-full flex flex-col relative pb-6">
                  {currentSlide.image && (
                    <div className="relative w-full h-[35vh] min-h-[200px] max-h-[350px] shadow-xl shadow-black/80 flex items-center justify-center bg-zinc-950 overflow-hidden">
                      <img src={currentSlide.image} alt="Story scene" className="w-full h-full object-contain object-center" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950"></div>
                      <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 pointer-events-none"></div>
                    </div>
                  )}
                  <div className={`flex-1 flex flex-col items-center justify-center p-6 sm:p-10 ${!currentSlide.image ? 'mt-10' : '-mt-5 relative z-10'}`}>
                    <p className="text-lg md:text-2xl font-serif text-center leading-relaxed text-zinc-200 drop-shadow-md max-w-4xl mx-auto">
                      {currentSlide.text}
                    </p>
                  </div>
                </div>
              )}

              {currentSlide.type === 'question' && (
                <div className="space-y-8 p-6 sm:p-12 max-w-4xl mx-auto w-full mt-4">
                  <h4 className="text-xl md:text-3xl font-bold cinzel-text text-center text-amber-400 mb-8 drop-shadow-sm leading-tight">
                    {currentSlide.question}
                  </h4>
                  <div className="space-y-4">
                    {currentSlide.options?.map((option: string, idx: number) => {
                      let btnVariant = "outline";
                      let className = "w-full justify-start text-left p-4 sm:p-6 h-auto text-base sm:text-lg transition-all duration-300 rounded-xl border-2 ";
                      
                      if (selectedAnswer === idx) {
                        if (isAnswerCorrect) {
                          btnVariant = "default";
                          className += " bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                        } else {
                          btnVariant = "destructive";
                          className += " bg-rose-500/10 border-rose-500/50 text-rose-400";
                        }
                      } else if (selectedAnswer !== null && idx === currentSlide.correct) {
                        className += " border-emerald-500/50 text-emerald-400 bg-emerald-500/10";
                      } else {
                         className += " border-amber-500/20 text-zinc-300 hover:border-amber-500/50 hover:bg-amber-500/5 bg-zinc-900/50";
                      }

                      return (
                        <Button
                          key={idx}
                          variant={btnVariant as any}
                          className={className}
                          onClick={() => handleAnswerSelect(idx)}
                          disabled={selectedAnswer !== null}
                        >
                          <span className="mr-4 font-bold text-amber-500/50 text-xl">{String.fromCharCode(65 + idx)}.</span>
                          <span className="flex-1 whitespace-pre-wrap">{option}</span>
                          {selectedAnswer === idx && isAnswerCorrect && <CheckCircle2 className="ml-4 w-6 h-6 text-emerald-400 shrink-0" />}
                          {selectedAnswer === idx && !isAnswerCorrect && <XCircle className="ml-4 w-6 h-6 text-rose-400 shrink-0" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentSlide.type === 'explanation' && (
                <div className="flex items-center justify-center p-6 sm:p-12 h-full">
                  <div className="space-y-6 p-8 sm:p-12 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-center shadow-xl backdrop-blur-sm max-w-4xl mx-auto w-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                    <Sparkles className="w-10 h-10 text-amber-400 mx-auto drop-shadow-md" />
                    <p className="text-lg sm:text-2xl font-serif leading-relaxed text-amber-50 drop-shadow-sm">
                      {currentSlide.text}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Area */}
        <div className="p-6 sm:p-8 border-t border-amber-500/20 shrink-0 flex justify-between items-center bg-zinc-950">
          <span className="text-sm font-bold tracking-widest uppercase text-amber-500/50">
            Chapter {currentSlideIndex + 1} <span className="mx-2 opacity-50">/</span> {slides.length}
          </span>
          <Button
            size="lg"
            onClick={handleNext}
            className="gap-2 px-10 py-6 text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 rounded-xl transition-all duration-300"
            disabled={currentSlide.type === 'question' && selectedAnswer === null}
          >
            {currentSlideIndex === slides.length - 1 ? 'Complete Journey' : 'Continue'}
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

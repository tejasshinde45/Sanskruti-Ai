import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Save, Share2, 
  BookOpen, Sparkles, Brain, Target, MessageCircleHeart, ArrowLeft
} from 'lucide-react';
import { getLocalReels, Reel } from '@/lib/reelsData';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useSEO } from '@/hooks/useSEO';

export default function Reels() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { saveReel, incrementReelsWatched, user } = useAuthStore();
  const navigate = useNavigate();

  useSEO({
    title: 'Dharmic Reels',
    description: 'Immersive short-form videos to learn Indian culture, spirituality, and ancient wisdom daily.',
    keywords: 'dharmic reels, spiritual reels, indian culture short videos, hinduism videos'
  });

  useEffect(() => {
    fetch('/api/v1/reels')
      .then(res => res.json())
      .then(data => {
         const mapped = data.map((r: any) => ({
             id: r._id,
             title: r.title,
             caption: r.caption,
             insight: r.insight,
             actionItem: r.actionItem,
             category: r.category,
             relatedModule: r.relatedModule,
             videoSrc: r.videoSrc
         }));
         setReels(mapped);
         setLoading(false);
      })
      .catch(e => {
         console.error("Failed to fetch backend reels", e);
         setLoading(false);
      });
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPosition = containerRef.current.scrollTop;
    const windowHeight = containerRef.current.clientHeight;
    const newIndex = Math.round(scrollPosition / windowHeight);
    
    if (newIndex !== activeReelIndex && reels[newIndex]) {
      setActiveReelIndex(newIndex);
      incrementReelsWatched();
    }
  };

  const currentReel = reels[activeReelIndex];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex justify-center z-40 overflow-hidden">
      
      {/* Dynamic Ambient Global Background (Like Insta/TikTok) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {currentReel && (
            <motion.video
              key={currentReel.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={currentReel.videoSrc}
              className="absolute inset-0 w-full h-full object-cover blur-[120px] scale-150 mix-blend-screen"
              autoPlay
              loop
              muted
              playsInline
            />
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full max-w-md h-[100dvh] overflow-y-scroll snap-y snap-mandatory no-scrollbar relative z-10 bg-transparent shadow-2xl"
      >
        {reels.map((reel, index) => (
          <ReelItem 
            key={reel.id} 
            reel={reel} 
            isActive={index === activeReelIndex}
            isMuted={isMuted}
            toggleMute={() => setIsMuted(!isMuted)}
            onSave={() => {
              saveReel(reel.id);
              toast.success("Wisdom Saved to your Akashic Records!");
            }}
            onTryInLife={() => {
              toast.info(`Action unlocked: ${reel.actionItem}`, { duration: 5000 });
            }}
            onLearnMore={() => navigate(`/${reel.relatedModule}`)}
            onBack={() => navigate('/')}
          />
        ))}
      </div>
    </div>
  );
}

interface ReelItemProps {
  reel: Reel;
  isActive: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  onSave: () => void;
  onTryInLife: () => void;
  onLearnMore: () => void;
  onBack: () => void;
}

function ReelItem({ reel, isActive, isMuted, toggleMute, onSave, onTryInLife, onLearnMore, onBack }: ReelItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      videoRef.current?.play().catch(e => console.log('Auto-play blocked', e));
    } else {
      setIsPlaying(false);
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full h-full snap-start snap-always relative overflow-hidden flex items-center justify-center bg-transparent group">
      {/* We removed the ambient video from here to put it in the global background! */}

      <video
        ref={videoRef}
        src={reel.videoSrc}
        className="w-full h-auto max-h-screen object-contain relative z-10"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Center Play/Pause Overlay Component */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute z-20 pointer-events-none"
          >
            <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Play className="w-10 h-10 text-white ml-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Overlay */}
      <div className="absolute top-0 inset-x-0 p-5 pt-8 z-20 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/90 hover:bg-white/20 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Badge className="bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-md px-3 py-1 text-[10px]">
            {reel.category}
          </Badge>
        </div>
        <button onClick={toggleMute} className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/90 hover:bg-white/20 transition">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Bottom Content Overlay - The Premium Glassmorphism Area */}
      <div className="absolute bottom-0 inset-x-0 p-5 pb-6 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold cinzel-text text-amber-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {reel.title}
          </h2>
          <p className="text-amber-50/90 text-xs font-medium drop-shadow-md pb-2">
            {reel.caption}
          </p>
        </div>

        {/* Insight Box - Compact & Premium */}
        <div className="bg-black/30 backdrop-blur-md border-l-2 border-amber-500/80 p-3 mb-5 shadow-2xl rounded-r-xl">
          <p className="text-xs text-amber-500/90 uppercase tracking-widest font-bold flex items-center gap-2 mb-1">
            <Brain className="w-3 h-3" /> Key Insight
          </p>
          <p className="text-xs text-white/95 leading-snug drop-shadow-sm">
            "{reel.insight}"
          </p>
        </div>

        {/* Action Buttons Hub */}
        <div className="grid grid-cols-4 gap-3">
          <ActionButton icon={<MessageCircleHeart />} label="Reflect" onClick={() => toast("Reflection prompt: How does this apply to you today?")} />
          <ActionButton icon={<BookOpen />} label="Learn" onClick={onLearnMore} />
          <ActionButton icon={<Save />} label="Save" onClick={onSave} />
          <ActionButton icon={<Target />} label="Action" onClick={onTryInLife} className="text-amber-400" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick, className = "text-white" }: { icon: React.ReactNode, label: string, onClick: () => void, className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors ${className}`}
    >
      {/* Icon Wrapper */}
      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
        <div className="w-4 h-4">
          {icon}
        </div>
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider opacity-90 drop-shadow-md">{label}</span>
    </button>
  );
}

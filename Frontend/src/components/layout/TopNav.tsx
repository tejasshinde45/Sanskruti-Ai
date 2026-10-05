import { Menu, Search, Bell, User, CalendarDays, Volume2, VolumeX, ShieldAlert, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useRef, useEffect } from 'react';

interface TopNavProps {
  onMenuClick: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Set volume to 20% for ambient background sound
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border shadow-sm z-50 text-card-foreground"
    >
      <audio 
        ref={audioRef} 
        loop 
        src="/music/Shiv Swarnamala Stuti.mp3" 
        preload="auto"
      />
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-primary/10 text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-theme-gradient rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-lg">स</span>
            </div>
            <div>
              <h1 className="text-xl font-bold cinzel-text gradient-text">
                Sanskruti AI
              </h1>
              <p className="text-xs text-muted-foreground">Cultural Intelligence Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 w-80 border border-border/50">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search scriptures, festivals, topics..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <ThemeSwitcher />

          <Button
            variant="ghost"
            size="icon"
            className={`relative rounded-full transition-all duration-300 ${isPlaying ? 'text-primary bg-primary/10 border border-primary/30 shadow-[0_0_15px_rgba(255,153,51,0.3)]' : 'text-foreground hover:bg-primary/10'}`}
            onClick={toggleMusic}
            title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
          >
            {isPlaying ? (
                <Volume2 className="w-5 h-5 animate-pulse" />
            ) : (
                <VolumeX className="w-5 h-5 opacity-60" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all"
            onClick={() => navigate('/family-tree')}
            title="Divine Family Tree"
          >
            <Network className="w-5 h-5 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 text-primary bg-primary/10 border border-primary/20 rounded-full hover:shadow-[0_0_15px_rgba(255,153,51,0.5)] transition-all"
            onClick={() => navigate('/calendar')}
          >
            <CalendarDays className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,153,51,0.8)]" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 text-foreground bg-primary/5 border border-primary/20 rounded-full"
            onClick={() => navigate('/profile')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

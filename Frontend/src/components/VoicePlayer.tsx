import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, VolumeX, Pause, Play, Loader2 } from 'lucide-react';
import { Scripture } from '@/lib/scriptureData';
import { toast } from 'sonner';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
const ELEVENLABS_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Default Adam voice for Free Tier

interface VoicePlayerProps {
  scripture: Scripture;
  activeLevel: 'basic' | 'deep' | 'spiritual';
}

export default function VoicePlayer({ scripture, activeLevel }: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup on unmount or when scripture changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setIsPaused(false);
    };
  }, [scripture, activeLevel]);

  const handleSpeak = async () => {
    // If paused, resume
    if (isPaused && audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // If already playing, pause it
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
      return;
    }

    // Start fresh playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Only read the meaning, skip the Shloka to save credits!
    const textToSpeak = scripture.explanations[activeLevel];

    if (!ELEVENLABS_API_KEY) {
      toast.warning("ElevenLabs API Key missing. Please check your .env file.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?optimize_streaming_latency=1`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSpeak,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.35,
            similarity_boost: 0.85,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.message || errorData.detail?.status || "ElevenLabs API failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      setIsLoading(false);
      setIsPlaying(true);
      audio.play();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`Audio Error: ${error.message}`);
      console.error(error);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <Card className="p-4 glass-panel border-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>

      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-secondary animate-spin" />
            ) : (
              <Volume2 className={`w-5 h-5 text-secondary ${isPlaying && !isPaused ? 'animate-pulse' : ''}`} />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground tracking-wide">Listen to Explanation</p>
            <p className="text-xs font-medium text-muted-foreground">
              {isLoading ? 'Connecting to ElevenLabs...' : isPlaying ? 'Playing Explanation...' : isPaused ? 'Paused' : 'Click play to listen'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSpeak}
            size="sm"
            disabled={isLoading}
            variant={(isPlaying || isPaused) ? "outline" : "default"}
            className={(isPlaying || isPaused) ? "border-secondary/50 text-secondary hover:bg-secondary/10" : "bg-theme-gradient-secondary hover:opacity-90 text-white shadow-md border-0"}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {isPaused ? 'Resume' : 'Play'}
              </>
            )}
          </Button>

          {(isPlaying || isPaused) && (
            <Button
              onClick={handleStop}
              size="sm"
              variant="outline"
              className="border-destructive/40 text-destructive hover:bg-destructive/10"
            >
              <VolumeX className="w-4 h-4 mr-2" />
              Stop
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs font-medium text-muted-foreground relative z-10">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary/50 animate-pulse"></span>
          Currently reading: <strong className="text-secondary uppercase tracking-wider">{activeLevel}</strong> meaning
        </p>
      </div>
    </Card>
  );
}

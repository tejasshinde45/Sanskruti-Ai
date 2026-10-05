import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { BookOpen, Sparkles, Wand2, Loader2, Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchScriptures } from '@/lib/api';
import { refineShloka, explainShloka } from '@/lib/gemini';
import { toast } from 'sonner';

interface ScriptureInputProps {
  onSubmit: (scriptureData: any) => void;
  onCustomSubmit: (customScripture: any) => void;
  compact?: boolean;
}

export default function ScriptureInput({ onSubmit, onCustomSubmit, compact = false }: ScriptureInputProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [customInput, setCustomInput] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: scriptures = [], isLoading } = useQuery({
    queryKey: ['scriptures'],
    queryFn: fetchScriptures
  });

  const handleSampleClick = (id: string) => {
    setSelectedId(id);
    onSubmit(id);
  };

  const handleAiRefine = async () => {
    if (!customInput.trim()) {
      toast.error("Please enter some text to refine.");
      return;
    }
    try {
      setIsRefining(true);
      const refinedData = await refineShloka(customInput);
      setCustomInput(refinedData.sanskrit + '\\n' + refinedData.transliteration);
      toast.success("Shloka refined successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to refine shloka. Make sure your API key is set.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleGenerateMeaning = async () => {
    if (!customInput.trim()) {
      toast.error("Please enter a shloka to generate meaning.");
      return;
    }
    try {
      setIsGenerating(true);
      const parts = customInput.split('\\n');
      const dataToExplain = {
        sanskrit: parts[0] || customInput,
        transliteration: parts[1] || "",
        source: "Custom Input",
        chapter: "",
        verse: ""
      };
      
      const fullScripture = await explainShloka(dataToExplain);
      setSelectedId('custom');
      onCustomSubmit(fullScripture);
      toast.success("Meaning generated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate meaning.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto flex flex-col gap-4 transition-all duration-700 ${compact ? '' : 'mt-[10vh]'}`}>
      
      {/* Sleek Prompt Box */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl p-2 flex flex-col md:flex-row shadow-2xl">
          
          <Textarea 
            placeholder="Ask about a shloka, type transliteration, or paste Sanskrit text..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="min-h-[60px] md:min-h-[80px] w-full resize-none bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 text-base md:text-lg p-4 custom-scrollbar"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerateMeaning();
              }
            }}
          />
          
          <div className="flex md:flex-col justify-end gap-2 p-2 shrink-0 border-t border-white/10 md:border-t-0 md:border-l md:pl-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleAiRefine} 
              disabled={isRefining || !customInput}
              title="AI Auto-complete / Refine"
              className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 text-primary hover:text-primary transition-all disabled:opacity-50"
            >
              {isRefining ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            </Button>
            <Button 
              onClick={handleGenerateMeaning} 
              disabled={isGenerating || !customInput}
              size="icon"
              title="Generate Deep Meaning"
              className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg transition-all disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>

        </div>
      </div>

      {/* Suggestions / Popular Shlokas (Hidden when compact) */}
      {!compact && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Popular Suggestions</p>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {isLoading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin"/> Loading...
              </div>
            ) : scriptures.slice(0, 4).map((scripture: any) => (
              <button
                key={scripture.id}
                onClick={() => handleSampleClick(scripture.id)}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)] transition-all text-left max-w-[280px] truncate-text group flex flex-col items-center text-center"
              >
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white truncate w-full">
                  "{scripture.sanskrit.substring(0, 30)}..."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                  {scripture.source}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Sparkles } from 'lucide-react';
import { Scripture } from '@/lib/scriptureData';

interface ExplanationDisplayProps {
  scripture: Scripture;
  activeLevel: 'basic' | 'deep' | 'spiritual';
  onLevelChange: (level: 'basic' | 'deep' | 'spiritual') => void;
}

export default function ExplanationDisplay({ scripture, activeLevel, onLevelChange }: ExplanationDisplayProps) {
  return (
    <Card className="p-6 md:p-8 space-y-6 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden rounded-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>

      <div className="space-y-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-3 flex-1 min-w-0">
            <h3 className="sanskrit-text text-3xl md:text-4xl font-bold text-white leading-relaxed break-words drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {scripture.sanskrit}
            </h3>
            <p className="text-sm md:text-base font-medium text-slate-300 italic">
              {scripture.transliteration}
            </p>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md px-4 py-1.5 text-xs uppercase tracking-widest font-bold whitespace-nowrap shrink-0 shadow-[0_0_10px_rgba(var(--primary),0.3)]">
            {scripture.source}
          </Badge>
        </div>

        <div className="flex gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          {scripture.chapter && <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">Chapter {scripture.chapter}</span>}
          {scripture.verse && <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">Verse {scripture.verse}</span>}
        </div>
      </div>

      <Tabs value={activeLevel} onValueChange={(v) => onLevelChange(v as any)} className="w-full relative z-10">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 rounded-xl p-1.5 h-auto relative shadow-inner">
          <TabsTrigger
            value="basic"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white py-2.5 transition-all font-bold tracking-wide text-slate-400 hover:text-slate-200"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Basic
          </TabsTrigger>
          <TabsTrigger
            value="deep"
            className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-white py-2.5 transition-all font-bold tracking-wide text-slate-400 hover:text-slate-200"
          >
            <Brain className="w-4 h-4 mr-2" />
            Deep
          </TabsTrigger>
          <TabsTrigger
            value="spiritual"
            className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white py-2.5 transition-all font-bold tracking-wide text-slate-400 hover:text-slate-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Spiritual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold cinzel-text text-xl md:text-2xl text-white tracking-wide">Basic Understanding</h4>
          </div>
          <p className="text-slate-200 leading-relaxed text-lg font-light">
            {scripture.explanations.basic}
          </p>
          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm text-slate-300 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-bold text-primary uppercase tracking-widest text-[10px] bg-primary/10 px-2 py-1 rounded w-fit border border-primary/20">Level Focus</span>
              Simple translation and surface meaning for beginners
            </p>
          </div>
        </TabsContent>

        <TabsContent value="deep" className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
              <Brain className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="font-bold cinzel-text text-xl md:text-2xl text-white tracking-wide">Deep Understanding</h4>
          </div>
          <p className="text-slate-200 leading-relaxed text-lg font-light">
            {scripture.explanations.deep}
          </p>
          <div className="mt-8 p-4 bg-secondary/5 rounded-xl border border-secondary/20">
            <p className="text-sm text-slate-300 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-bold text-secondary uppercase tracking-widest text-[10px] bg-secondary/10 px-2 py-1 rounded w-fit border border-secondary/20">Level Focus</span>
              Contextual wisdom and practical application in daily life
            </p>
          </div>
        </TabsContent>

        <TabsContent value="spiritual" className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-bold cinzel-text text-xl md:text-2xl text-white tracking-wide">Spiritual Understanding</h4>
          </div>
          <p className="text-slate-200 leading-relaxed text-lg font-light">
            {scripture.explanations.spiritual}
          </p>
          <div className="mt-8 p-5 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 border border-white/10 rounded-xl relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-black/10 transition-all"></div>
            <p className="text-sm text-white flex flex-col sm:flex-row sm:items-center gap-3 relative z-10">
              <span className="font-bold text-white uppercase tracking-widest text-[10px] bg-white/20 px-2 py-1 rounded shadow-sm w-fit border border-white/20">Level Focus</span>
              Profound philosophical insights and path to liberation
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

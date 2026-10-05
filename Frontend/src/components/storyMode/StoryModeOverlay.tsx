import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipForward, X, ArrowRight } from 'lucide-react';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';
import { useCameraControl, CameraTarget } from '../../hooks/useCameraControl';

interface StoryChapter {
  title: string;
  text: string;
  target: CameraTarget;
  highlightNodes?: string[]; // Nodes to select/highlight specifically
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    title: 'The Supreme Source',
    text: "Before time began, there was only Parabrahman — the formless, infinite, eternal Absolute. Pure consciousness, from which everything arises and to which everything returns.",
    target: { type: 'node', ids: ['parabrahman'], zoomLevel: 0.8, offsetY: -150 },
    highlightNodes: ['parabrahman']
  },
  {
    title: 'The Cosmic Trinity',
    text: "From the Supreme emerged the Trimurti. Brahma to create, Vishnu to preserve, and Shiva to destroy and transform. Together, they set the great wheel of the cosmos into motion.",
    target: { type: 'cluster', ids: ['brahma', 'vishnu', 'shiva'], offsetY: -150 },
    highlightNodes: ['brahma', 'vishnu', 'shiva']
  },
  {
    title: 'The Mind-Born Progenitors',
    text: "To populate the vast universe, Lord Brahma created the Prajapatis from his own mind. Sages like Marichi, Daksha, Atri, and the first man, Manu, became the grandfathers of all existence.",
    target: { type: 'cluster', ids: ['marichi', 'daksha', 'manu', 'atri'], offsetY: -150 },
    highlightNodes: ['marichi', 'daksha', 'manu', 'atri']
  },
  {
    title: 'The Celestial Roots',
    text: "The mighty Sage Kashyapa married the daughters of Daksha, including Aditi and Vinata. From these divine unions sprang the Devas, the Asuras, the Nagas, and the mighty eagles.",
    target: { type: 'cluster', ids: ['kashyapa', 'aditi', 'vinata'], offsetY: -150 },
    highlightNodes: ['kashyapa', 'aditi', 'vinata']
  },
  {
    title: 'The Gods of Light',
    text: "The heavens were illuminated. Surya the Sun God and Chandra the Moon God took their places in the sky, while Lord Indra rose to rule over Svarga Loka as the King of the Devas.",
    target: { type: 'cluster', ids: ['surya', 'chandra', 'indra'], offsetY: -150 },
    highlightNodes: ['surya', 'chandra', 'indra']
  },
  {
    title: 'The First Dynasties',
    text: "The divine bloodline reached the earth. From the Sun God descended the noble Solar Dynasty (Suryavansha) via Ikshvaku. From the Moon God descended the Lunar Dynasty (Chandravansha) via Pururavas.",
    target: { type: 'cluster', ids: ['ikshvaku', 'pururavas'], offsetY: -150 },
    highlightNodes: ['ikshvaku', 'pururavas']
  },
  {
    title: 'The Epic Heroes',
    text: "Whenever Dharma declined, the divine intervened. Vishnu descended as Rama in the Solar line, and as Krishna in the Lunar line. Heroes like the Pandavas shaped the epic destiny of the world.",
    target: { type: 'cluster', ids: ['rama', 'krishna', 'pandavas_cluster', 'vyasa'], offsetY: -150 },
    highlightNodes: ['rama', 'krishna', 'pandavas_cluster', 'vyasa']
  },
  {
    title: 'The Culmination',
    text: "Thousands of generations later, this exact continuous cosmic bloodline flows directly down to the present day. You, and all of modern humanity, are the living culmination of this magnificent divine tree.",
    target: { type: 'node', ids: ['humanity_node'], zoomLevel: 1.1, offsetY: -150 },
    highlightNodes: ['humanity_node']
  },
  {
    title: 'The Living Cosmos',
    text: "Mythology is not ancient history — it is your history. Every god, every sage, every epic hero is interconnected in one infinite, breathing web of existence.",
    target: { type: 'cluster', ids: ['parabrahman', 'humanity_node'], offsetY: -50 },
    highlightNodes: [] // Highlight nothing so the whole tree glows normally
  }
];

const StoryModeOverlay = () => {
  const storyIndex = useFamilyTreeStore((state) => state.storyIndex);
  const setStoryIndex = useFamilyTreeStore((state) => state.setStoryIndex);
  const selectNode = useFamilyTreeStore((state) => state.selectNode);
  const { flyToComposition } = useCameraControl();

  const isActive = storyIndex >= 0;

  useEffect(() => {
    if (isActive && STORY_CHAPTERS[storyIndex]) {
      const chapter = STORY_CHAPTERS[storyIndex];
      
      flyToComposition(chapter.target, false);
      
      // If chapter asks to highlight specific nodes, use the selectNode logic 
      // (in a real app, you might want a `highlightGroup` action in Zustand)
      if (chapter.highlightNodes && chapter.highlightNodes.length === 1) {
        selectNode(chapter.highlightNodes[0]);
      } else {
        selectNode(null); // Clear selection to let bounds framing shine
      }
    }
  }, [storyIndex, flyToComposition, selectNode, isActive]);

  const nextStep = () => {
    if (storyIndex < STORY_CHAPTERS.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      endStory();
    }
  };

  const endStory = () => {
    setStoryIndex(-1);
    selectNode(null);
  };

  return (
    <>
      {/* Sacred Journey Button */}
      <AnimatePresence>
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-8 right-8 z-20 pointer-events-auto"
          >
            <button onClick={() => setStoryIndex(0)} className="relative group flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-400/40 transition-colors duration-500"
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-10px] rounded-full border border-dashed border-amber-500/30 group-hover:border-amber-400/60 transition-colors duration-500"
              />
              <div className="relative flex items-center gap-3 bg-[#030712]/90 backdrop-blur-xl border border-amber-500/40 text-amber-200 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(245,158,11,0.2)] overflow-hidden">
                <Play className="w-3 h-3 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,1)]" fill="currentColor" />
                <span>Cosmic Journey</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Full-Width Narration Bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto"
          >
            <div className="absolute top-[-100px] left-0 right-0 h-[100px] bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />

            <div className="relative w-full bg-[#02040a]/95 backdrop-blur-3xl border-t border-amber-500/30 px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
              
              <button onClick={endStory} className="absolute top-4 left-8 text-amber-100/30 hover:text-amber-100/70 text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                <X className="w-3 h-3" /> Exit Journey
              </button>

              <div className="absolute top-0 left-0 h-1 bg-amber-500/20 w-full">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((storyIndex + 1) / STORY_CHAPTERS.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex-1 max-w-4xl mx-auto text-center mt-4 md:mt-0 flex flex-col items-center">
                <motion.span 
                  key={`title-${storyIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-amber-500/80 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 border border-amber-500/20 px-4 py-1 rounded-full"
                >
                  Chapter {storyIndex + 1}: {STORY_CHAPTERS[storyIndex].title}
                </motion.span>
                <motion.p 
                  key={`text-${storyIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-3xl font-serif text-amber-50 tracking-wide leading-relaxed drop-shadow-md"
                >
                  "{STORY_CHAPTERS[storyIndex].text}"
                </motion.p>
              </div>

              <div className="shrink-0 w-full md:w-auto flex justify-center">
                <button onClick={nextStep} className="group relative flex items-center justify-center gap-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 px-8 py-4 rounded-full transition-all duration-300">
                  <span className="font-bold uppercase tracking-widest text-sm drop-shadow-md group-hover:text-amber-100 transition-colors">
                    {storyIndex < STORY_CHAPTERS.length - 1 ? 'Continue' : 'Complete'}
                  </span>
                  <div className="relative w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.9)] transition-shadow">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoryModeOverlay;

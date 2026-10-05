import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';

const UNIVERSE_LABELS: Record<string, string> = {
  'MAIN_COSMIC_TREE': 'Main Cosmic Tree',
  'SupremeUniverse': 'Supreme Universe',
  'DakshaUniverse': 'Daksha Universe',
  'DevaUniverse': 'Deva Universe',
  'AsuraUniverse': 'Asura Universe',
  'NagaUniverse': 'Naga & Animal Universe',
  'SolarDynastyUniverse': 'Solar Dynasty',
  'LunarDynastyUniverse': 'Lunar Dynasty',
  'RamayanaUniverse': 'Ramayana Epic',
  'MahabharataUniverse': 'Mahabharata Epic',
  'ShivaUniverse': 'Shiva Lineage',
  'VishnuUniverse': 'Vishnu Lineage'
};

const LineageBreadcrumbs = () => {
  const activeUniverse = useFamilyTreeStore((state) => state.activeUniverse);
  const loadUniverse = useFamilyTreeStore((state) => state.loadUniverse);
  const experienceMode = useFamilyTreeStore((state) => state.experienceMode);

  if (experienceMode === 'STORY') return null;

  return (
    <div className="absolute top-8 left-8 z-20 pointer-events-auto">
      <div className="flex items-center gap-2 bg-[#050a15]/80 backdrop-blur-xl border border-amber-500/20 px-4 py-2 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        
        <button 
          onClick={() => loadUniverse('MAIN_COSMIC_TREE')}
          className="p-1.5 rounded-full hover:bg-amber-500/20 text-amber-500 transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
        </button>

        {activeUniverse !== 'MAIN_COSMIC_TREE' && (
          <>
            <ChevronRight className="w-3 h-3 text-amber-500/30" />
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <span className="text-amber-100 text-xs font-bold uppercase tracking-widest drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                  {UNIVERSE_LABELS[activeUniverse] || activeUniverse}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </div>
      
      {activeUniverse !== 'MAIN_COSMIC_TREE' && (
        <p className="mt-2 text-[10px] text-amber-500/50 uppercase tracking-widest pl-2">
          Isolated Subtree Engine Active
        </p>
      )}
    </div>
  );
};

export default LineageBreadcrumbs;

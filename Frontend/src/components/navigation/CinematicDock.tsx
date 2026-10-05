import { motion } from 'framer-motion';
import { Network, History, Globe } from 'lucide-react';
import { useFamilyTreeStore, ViewMode } from '../../store/useFamilyTreeStore';

const CinematicDock = () => {
  const activeViewMode = useFamilyTreeStore((state) => state.activeViewMode);
  const setViewMode = useFamilyTreeStore((state) => state.setViewMode);
  const experienceMode = useFamilyTreeStore((state) => state.experienceMode);

  // Hide during Story Mode to maintain cinematic focus
  if (experienceMode === 'STORY') return null;

  const modes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'tree', label: 'Cosmic Tree', icon: Network },
    { id: 'timeline', label: 'Yuga Timeline', icon: History },
    { id: 'lokaMap', label: 'Universe Map', icon: Globe },
  ];

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="flex bg-[#050a15]/60 backdrop-blur-xl border border-amber-500/20 p-1.5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeViewMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10 ${
                isActive ? 'text-black' : 'text-amber-100/50 hover:text-amber-100 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockMode"
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl z-[-1] shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4" />
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CinematicDock;

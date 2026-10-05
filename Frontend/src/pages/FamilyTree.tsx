import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, ZoomIn } from 'lucide-react';
import { ReactFlowProvider } from '@xyflow/react';

import CosmicCanvas from '../components/canvas/CosmicCanvas';
import StarfieldBackground from '../components/cosmic/StarfieldBackground';
import CharacterProfileDrawer from '../components/profiles/CharacterProfileDrawer';
import LineageBreadcrumbs from '../components/navigation/LineageBreadcrumbs';
import CinematicDock from '../components/navigation/CinematicDock';
import UniversalSearch from '../components/search/UniversalSearch';
import LineageAtlas from '../components/filters/LineageAtlas';
import StoryModeOverlay from '../components/storyMode/StoryModeOverlay';
import TimelineView from '../components/timeline/TimelineView';
import UniverseMap from '../components/lokaMap/UniverseMap';

import { useFamilyTreeStore } from '../store/useFamilyTreeStore';
import { useCameraControl } from '../hooks/useCameraControl';

// Inner component needed to use ReactFlow hooks
const TreeOverlaySystems = () => {
  const { flyToComposition } = useCameraControl();
  const experienceMode = useFamilyTreeStore(state => state.experienceMode);

  const handleSearchNavigate = (id: string) => {
    flyToComposition({ type: 'node', ids: [id] }, true);
  };

  return (
    <>
      {experienceMode !== 'STORY' && <UniversalSearch onNavigate={handleSearchNavigate} />}
      <StoryModeOverlay />
    </>
  );
};

export default function FamilyTree() {
  const initializeLayout = useFamilyTreeStore((state) => state.initializeLayout);
  const activeViewMode = useFamilyTreeStore((state) => state.activeViewMode);
  const experienceMode = useFamilyTreeStore((state) => state.experienceMode);
  const activeUniverse = useFamilyTreeStore((state) => state.activeUniverse);

  useEffect(() => {
    initializeLayout();
  }, [initializeLayout]);

  const isStoryMode = experienceMode === 'STORY';

  return (
    <main className="flex flex-col h-[calc(100dvh-4rem)] w-full overflow-hidden relative bg-[#030712]">
      
      {/* 1. Cinematic Atmospheric Layer */}
      <StarfieldBackground />

      {/* 2. Top-Level UI Orchestration */}
      <CinematicDock />

      {/* 3. Global View Rendering */}
      <AnimatePresence mode="wait">
        
        {activeViewMode === 'timeline' && <TimelineView key="timeline" />}
        {activeViewMode === 'lokaMap' && <UniverseMap key="map" />}
        
        {activeViewMode === 'tree' && (
          <motion.div 
            key={`tree-${activeUniverse}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <ReactFlowProvider>
              {/* Interactive Graph Canvas */}
              <CosmicCanvas />

              {/* Floating UI Layer */}
              {!isStoryMode && <LineageBreadcrumbs />}
              
              <LineageAtlas />
              
              <TreeOverlaySystems />

              {/* Minimal Instructions */}
              {!isStoryMode && (
                <aside aria-label="Controls" className="absolute bottom-8 left-8 z-10 flex gap-4 pointer-events-none">
                  <div className="bg-[#050a15]/80 backdrop-blur-md border border-amber-500/10 px-6 py-3 rounded-2xl flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center gap-2 text-amber-100/50 text-[10px] font-bold uppercase tracking-widest">
                      <MousePointer2 className="w-3 h-3 text-amber-500/50" aria-hidden="true" /> Explore
                    </div>
                    <div className="w-px h-4 bg-white/10" aria-hidden="true"></div>
                    <div className="flex items-center gap-2 text-amber-100/50 text-[10px] font-bold uppercase tracking-widest">
                      <ZoomIn className="w-3 h-3 text-amber-500/50" aria-hidden="true" /> Zoom
                    </div>
                  </div>
                </aside>
              )}

            </ReactFlowProvider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Drawer Layer (Slides in over everything) */}
      <CharacterProfileDrawer />

    </main>
  );
}

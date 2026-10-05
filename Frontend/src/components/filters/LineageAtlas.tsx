import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';
import { useCameraControl } from '../../hooks/useCameraControl';

interface AtlasItem {
  id: string;
  label: string;
  nodeTarget?: string; // Node to fly to
  children?: AtlasItem[];
}

const ATLAS_DATA: AtlasItem[] = [
  {
    id: 'trimurti',
    label: 'The Trimurti',
    children: [
      { id: 'brahma', label: 'Lord Brahma', nodeTarget: 'brahma' },
      { id: 'vishnu', label: 'Lord Vishnu', nodeTarget: 'vishnu' },
      { id: 'shiva', label: 'Lord Shiva', nodeTarget: 'shiva' },
    ]
  },
  {
    id: 'prajapatis',
    label: 'The Prajapatis',
    children: [
      {
        id: 'daksha',
        label: 'Daksha',
        nodeTarget: 'daksha',
        children: [
          { id: 'aditi', label: 'Aditi (Devas)', nodeTarget: 'aditi' },
          { id: 'diti', label: 'Diti (Daityas)', nodeTarget: 'diti' },
          { id: 'danu', label: 'Danu (Danavas)', nodeTarget: 'danu' }
        ]
      },
      { id: 'kashyapa', label: 'Sage Kashyapa' }
    ]
  }
];

const NestedAtlasItem = ({ item, depth = 0 }: { item: AtlasItem, depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { flyToComposition } = useCameraControl();
  const selectNode = useFamilyTreeStore(state => state.selectNode);

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    if (item.nodeTarget) {
      flyToComposition({ type: 'node', ids: [item.nodeTarget], zoomLevel: 1.2 }, true);
      selectNode(item.nodeTarget);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-4 py-2 hover:bg-amber-500/10 transition-colors ${depth === 0 ? 'border-b border-amber-500/10' : ''}`}
        style={{ paddingLeft: `${(depth * 12) + 16}px` }}
      >
        <div className="flex items-center gap-2">
          {depth > 0 && <div className="w-1 h-1 bg-amber-500/30 rounded-full" />}
          <span className={`text-xs uppercase tracking-widest ${depth === 0 ? 'font-bold text-amber-200' : 'text-amber-100/70 hover:text-amber-100'}`}>
            {item.label}
          </span>
        </div>
        {hasChildren && (
          isOpen ? <ChevronDown className="w-3 h-3 text-amber-500/50" /> : <ChevronRight className="w-3 h-3 text-amber-500/50" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/20"
          >
            {item.children!.map(child => (
              <NestedAtlasItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LineageAtlas = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const experienceMode = useFamilyTreeStore((state) => state.experienceMode);

  if (experienceMode === 'STORY') return null;

  return (
    <div 
      className="absolute bottom-8 right-8 z-20 flex flex-col items-end pointer-events-auto"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-4 flex flex-col items-end gap-2 w-72"
          >
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-1 bg-[#030712]/90 border border-amber-500/30 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3 h-3" /> Cosmic Encyclopedia
            </div>
            
            <div className="w-full bg-[#050a15]/95 border border-amber-500/20 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                {ATLAS_DATA.map(item => (
                  <NestedAtlasItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className={`p-4 rounded-full border transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl ${isExpanded ? 'bg-amber-900/80 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-[#050a15]/90 border-amber-500/30 text-amber-500 hover:text-amber-300'}`}>
        <Library className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LineageAtlas;

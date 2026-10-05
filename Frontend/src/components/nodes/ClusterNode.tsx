import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { CosmicNodeData } from '../../types/familyTree';
import BaseNodeWrapper from './BaseNodeWrapper';
import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';

const ClusterNode = ({ id, data }: NodeProps<CosmicNodeData>) => {
  const loadUniverse = useFamilyTreeStore(state => state.loadUniverse);

  return (
    <BaseNodeWrapper
      id={id}
      className="w-[280px] border border-indigo-500/40"
      glowClass={data.isHighlighted
        ? 'shadow-[0_0_50px_rgba(99,102,241,0.8)]'
        : 'shadow-[0_0_20px_rgba(99,102,241,0.15)]'}
      isFaded={data.isFaded}
      isHighlighted={data.isHighlighted}
    >
      {/* Constellation header */}
      <div className="relative overflow-hidden h-20 w-full bg-gradient-to-r from-indigo-950 via-violet-900/20 to-indigo-950 flex items-center justify-between px-5 border-b border-indigo-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent pointer-events-none" />

        {/* Orbiting dots as constellation */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            animate={{ 
              x: [Math.cos(i * 2.1) * 30, Math.cos(i * 2.1 + 3.14) * 30],
              y: [Math.sin(i * 2.1) * 15, Math.sin(i * 2.1 + 3.14) * 15],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            style={{ left: '50%', top: '50%' }}
          />
        ))}

        <div className="relative z-10 flex items-center gap-3">
          <Users className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <h3 className="text-sm font-bold text-indigo-50 uppercase tracking-wide">
            {data.label}
          </h3>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center bg-indigo-900/50 border border-indigo-500/40 rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-bold text-indigo-200">{data.clusterSize || '∞'}</span>
          <span className="text-[8px] text-indigo-400/70 uppercase tracking-widest">Entities</span>
        </div>
      </div>

      {/* Constellation Names (Expanded Details) */}
      {data.clusterNames && (
        <div className="px-4 py-3 bg-[#0a0f25]/90 border-b border-indigo-500/20 grid gap-1.5">
          {data.clusterNames.map((name, idx) => (
            <div key={name} className="flex items-center gap-2 group cursor-pointer">
              <div className="w-1 h-1 rounded-full bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors" />
              <span className="text-indigo-200/80 group-hover:text-indigo-100 text-[11px] font-medium tracking-wide transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Label band */}
      <div className="px-5 py-3 flex items-center justify-between bg-gradient-to-b from-indigo-950/30 to-black/50">
        {data.title && (
          <p className="text-indigo-300 text-[10px] uppercase tracking-widest">{data.title}</p>
        )}
        <div className="flex items-center gap-1 text-indigo-400/60 text-[10px] hover:text-indigo-300 transition-colors cursor-pointer">
          <span>{data.clusterNames ? 'Focus' : 'Expand'}</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </BaseNodeWrapper>
  );
};

export default memo(ClusterNode);

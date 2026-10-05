import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { CosmicNodeData } from '../../types/familyTree';
import BaseNodeWrapper from './BaseNodeWrapper';
import { motion } from 'framer-motion';
import { Feather, MapPin } from 'lucide-react';

const PrajapatiNode = ({ id, data }: NodeProps<CosmicNodeData>) => {
  return (
    <BaseNodeWrapper
      id={id}
      className="w-[240px] border border-cyan-500/40"
      glowClass={data.isHighlighted
        ? 'shadow-[0_0_50px_rgba(6,182,212,0.8)]'
        : 'shadow-[0_0_20px_rgba(6,182,212,0.12)]'}
      isFaded={data.isFaded}
      isHighlighted={data.isHighlighted}
    >
      {/* Icon Header */}
      <div className="relative h-28 w-full bg-gradient-to-br from-cyan-950 via-teal-900/20 to-[#0a0f25] flex items-center justify-center border-b border-cyan-500/20 overflow-hidden">
        <div className="absolute w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Feather className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.9)] relative z-10" />
        </motion.div>
        {/* Divine shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col items-center text-center bg-gradient-to-b from-cyan-950/20 to-black/40">
        <h3 className="text-base font-bold text-cyan-50 uppercase tracking-wide drop-shadow-md mb-1">
          {data.label}
        </h3>
        {data.title && (
          <p className="text-cyan-400/80 text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-cyan-500/20 pb-2 w-full">
            {data.title}
          </p>
        )}
        {data.description && (
          <p className="text-slate-300/60 text-[10px] leading-relaxed">{data.description}</p>
        )}
        {data.realm && (
          <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-[9px] text-cyan-300/70">
            <MapPin className="w-2.5 h-2.5" />{data.realm}
          </div>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

export default memo(PrajapatiNode);

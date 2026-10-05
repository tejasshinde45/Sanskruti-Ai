import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { CosmicNodeData } from '../../types/familyTree';
import BaseNodeWrapper from './BaseNodeWrapper';
import { motion } from 'framer-motion';
import { Zap, MapPin } from 'lucide-react';

const SpecialNode = ({ id, data }: NodeProps<CosmicNodeData>) => {
  return (
    <BaseNodeWrapper
      id={id}
      className="w-[240px] border border-fuchsia-500/40"
      glowClass={data.isHighlighted
        ? 'shadow-[0_0_55px_rgba(217,70,239,0.9)]'
        : 'shadow-[0_0_20px_rgba(217,70,239,0.12)]'}
      isFaded={data.isFaded}
      isHighlighted={data.isHighlighted}
    >
      {/* Icon Header */}
      <div className="relative h-24 w-full bg-gradient-to-br from-fuchsia-950 via-purple-900/20 to-[#0a0f25] flex items-center justify-center border-b border-fuchsia-500/20 overflow-hidden">
        <div className="absolute w-20 h-20 bg-fuchsia-500/10 rounded-full blur-xl" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className="w-10 h-10 text-fuchsia-400 drop-shadow-[0_0_12px_rgba(217,70,239,0.9)] relative z-10" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col items-center text-center bg-gradient-to-b from-fuchsia-950/10 to-black/40">
        <h3 className="text-base font-bold text-fuchsia-50 uppercase tracking-wide drop-shadow-md mb-1">
          {data.label}
        </h3>
        {data.title && (
          <p className="text-fuchsia-400/80 text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-fuchsia-500/20 pb-2 w-full">
            {data.title}
          </p>
        )}
        {data.description && (
          <p className="text-slate-300/60 text-[10px] leading-relaxed">{data.description}</p>
        )}
        {data.realm && (
          <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-fuchsia-950/40 border border-fuchsia-500/20 rounded-full text-[9px] text-fuchsia-300/70">
            <MapPin className="w-2.5 h-2.5" />{data.realm}
          </div>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

export default memo(SpecialNode);

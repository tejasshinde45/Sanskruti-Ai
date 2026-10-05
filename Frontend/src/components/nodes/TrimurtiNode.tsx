import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { CosmicNodeData } from '../../types/familyTree';
import BaseNodeWrapper from './BaseNodeWrapper';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

const TrimurtiNode = ({ id, data }: NodeProps<CosmicNodeData>) => {
  return (
    <BaseNodeWrapper
      id={id}
      className="w-[280px] border border-amber-500/50"
      glowClass={data.isHighlighted
        ? 'shadow-[0_0_70px_rgba(245,158,11,0.9)]'
        : 'shadow-[0_0_35px_rgba(245,158,11,0.2)]'}
      isFaded={data.isFaded}
      isHighlighted={data.isHighlighted}
    >
      {/* Portrait */}
      <div className="relative h-44 w-full overflow-hidden border-b border-amber-500/30">
        {data.image ? (
          <img src={data.image} alt={data.label} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-900/40 via-indigo-950 to-[#0a0f25] flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Star className="w-14 h-14 text-amber-400/70 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
            </motion.div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f25] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col items-center text-center bg-gradient-to-b from-amber-900/10 to-black/50">
        <h3 className="text-xl font-bold text-amber-100 uppercase tracking-wide drop-shadow-md mb-1">
          {data.label}
        </h3>
        {data.title && (
          <p className="text-amber-500/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 border-b border-amber-500/20 pb-2 w-full">
            {data.title}
          </p>
        )}
        {data.description && (
          <p className="text-slate-300/70 text-[10px] leading-relaxed">{data.description}</p>
        )}
        {data.realm && (
          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-500/20 rounded-full text-[10px] text-amber-300/80">
            <MapPin className="w-3 h-3" />{data.realm}
          </div>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

export default memo(TrimurtiNode);

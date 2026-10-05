import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { CosmicNodeData } from '../../types/familyTree';
import BaseNodeWrapper from './BaseNodeWrapper';
import { motion } from 'framer-motion';
import { User, MapPin, Heart } from 'lucide-react';

const HumanNode = ({ id, data }: NodeProps<CosmicNodeData>) => {
  const isHumanity = id === 'humanity_node';

  if (isHumanity) {
    return (
      <BaseNodeWrapper
        id={id}
        className="w-[300px] border-2 border-amber-400/80"
        glowClass="shadow-[0_0_80px_rgba(251,191,36,0.7),0_0_160px_rgba(251,191,36,0.3)]"
        isFaded={data.isFaded}
        isHighlighted={data.isHighlighted}
      >
        {/* Pulsing outer rings — the "destination" node */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl border border-amber-400/20 pointer-events-none"
            animate={{ scale: [1, 1 + i * 0.06], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        <div className="relative p-6 flex flex-col items-center text-center bg-gradient-to-b from-amber-950/50 via-[#0a0f25] to-black/60">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(251,191,36,0.8)]"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-amber-100 uppercase tracking-widest mb-1 drop-shadow-lg">
            {data.label}
          </h3>
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-3 border-b border-amber-500/30 pb-3 w-full">
            {data.title}
          </p>
          <p className="text-amber-100/50 text-[10px] italic leading-relaxed">
            Descendant of the entire divine lineage above
          </p>
          {data.realm && (
            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-full text-[10px] text-amber-300">
              <MapPin className="w-3 h-3" />{data.realm}
            </div>
          )}
        </div>
      </BaseNodeWrapper>
    );
  }

  // Standard human/king node
  return (
    <BaseNodeWrapper
      id={id}
      className="w-[220px] border border-slate-500/40"
      glowClass={data.isHighlighted ? 'shadow-[0_0_35px_rgba(148,163,184,0.6)]' : 'shadow-[0_0_10px_rgba(100,116,139,0.08)]'}
      isFaded={data.isFaded}
      isHighlighted={data.isHighlighted}
    >
      <div className="relative h-16 w-full bg-gradient-to-r from-slate-900 to-indigo-950/40 flex items-center gap-3 px-4 border-b border-slate-600/20 overflow-hidden">
        <div className="p-2 rounded-lg bg-slate-700/30 border border-slate-600/20 shrink-0">
          <User className="w-4 h-4 text-slate-300" />
        </div>
        <div className="min-w-0">
          <p className="text-slate-100 text-sm font-bold uppercase tracking-wide leading-tight truncate">{data.label}</p>
          {data.title && <p className="text-slate-400 text-[9px] uppercase tracking-widest truncate">{data.title}</p>}
        </div>
      </div>
      {(data.description || data.realm) && (
        <div className="px-4 py-2.5 bg-gradient-to-b from-transparent to-black/30">
          {data.description && <p className="text-slate-400/70 text-[10px] leading-relaxed mb-1">{data.description}</p>}
          {data.realm && (
            <div className="flex items-center gap-1 text-[9px] text-slate-500">
              <MapPin className="w-2.5 h-2.5" />{data.realm}
            </div>
          )}
        </div>
      )}
    </BaseNodeWrapper>
  );
};

export default memo(HumanNode);

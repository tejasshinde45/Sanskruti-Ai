import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { CosmicNodeData } from '../../types/familyTree';
import BaseNodeWrapper from './BaseNodeWrapper';
import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';

const SupremeNode = ({ id, data }: NodeProps<CosmicNodeData>) => {
  return (
    <BaseNodeWrapper
      id={id}
      className="w-[320px] border-2 border-amber-400/60"
      glowClass={data.isHighlighted
        ? 'shadow-[0_0_100px_rgba(251,191,36,1),0_0_40px_rgba(251,191,36,0.6)]'
        : 'shadow-[0_0_60px_rgba(251,191,36,0.35),0_0_20px_rgba(251,191,36,0.15)]'}
      isFaded={data.isFaded}
      isHighlighted={data.isHighlighted}
      isRoot
    >
      {/* Pulsing outer aura ring */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-[-3px] rounded-xl border border-amber-400/30 pointer-events-none z-20"
      />

      {/* Portrait area */}
      <div className="relative h-52 w-full overflow-hidden border-b-2 border-amber-500/40">
        {data.image ? (
          <img src={data.image} alt={data.label} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-950 via-yellow-900/30 to-[#0a0f25] flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border border-amber-500/20 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border border-amber-400/30 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,1)]" />
              </motion.div>
            </motion.div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f25] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center text-center bg-gradient-to-b from-amber-950/20 to-black/60">
        <h3 className="text-2xl font-bold text-amber-100 uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,1)] mb-1">
          {data.label}
        </h3>
        {data.title && (
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 border-b border-amber-500/30 pb-3 w-full">
            {data.title}
          </p>
        )}
        {data.description && (
          <p className="text-amber-100/60 text-[10px] leading-relaxed italic">{data.description}</p>
        )}
        {data.realm && (
          <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 border border-amber-500/30 rounded-full text-[10px] text-amber-300">
            <MapPin className="w-3 h-3" />{data.realm}
          </div>
        )}
      </div>
    </BaseNodeWrapper>
  );
};

export default memo(SupremeNode);

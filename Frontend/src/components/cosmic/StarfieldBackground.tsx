import { motion } from 'framer-motion';
import { memo } from 'react';

const NEBULA_LAYERS = [
  { gradient: 'from-indigo-900/15 via-purple-900/8 to-transparent', duration: 35, rotate: [0, 8, -4, 0] },
  { gradient: 'from-amber-900/8 via-orange-900/5 to-transparent', duration: 45, rotate: [0, -6, 5, 0] },
  { gradient: 'from-cyan-900/10 via-teal-900/5 to-transparent', duration: 55, rotate: [0, 5, -8, 0] },
];

const StarfieldBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#02040a] pointer-events-none z-[-1]">

      {/* Nebula layers */}
      {NEBULA_LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          className={`absolute inset-[-60%] bg-[radial-gradient(ellipse_at_${i === 0 ? 'center' : i === 1 ? 'top_right' : 'bottom_left'},_var(--tw-gradient-stops))] ${layer.gradient} blur-3xl`}
          animate={{
            scale: [1, 1.08, 1],
            rotate: layer.rotate,
            opacity: [0.4 + i * 0.1, 0.7 + i * 0.05, 0.4 + i * 0.1],
          }}
          transition={{ duration: layer.duration, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Cosmic fog — edge darkening */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/95 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/85 pointer-events-none mix-blend-multiply" />

      {/* Intense cinematic vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_250px_rgba(0,0,0,0.95)] pointer-events-none" />

      {/* Subtle star field — tiny fixed dots */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 15%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 35%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 75%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 50%, rgba(255,255,255,0.5) 0%, transparent 100%)`
        }}
      />

    </div>
  );
};

export default memo(StarfieldBackground);

/**
 * Cinematic Theme Constants for the Cosmic Family Tree
 * Keeps styling consistent and modular.
 */

export const COSMIC_THEME = {
  // Background Colors
  canvasBg: 'bg-[#030712]', // Extremely deep dark
  nodeBgBase: 'bg-[#0a0f25]', // Deep space blue for nodes

  // Glowing Borders
  borders: {
    supreme: 'border-amber-400',
    trimurti: 'border-amber-500/80',
    prajapati: 'border-cyan-500/60',
    human: 'border-slate-500/60',
    special: 'border-fuchsia-500/60',
  },

  // Drop Shadows (Outer Glows) - Reduced for UX Orchestration
  glows: {
    supreme: 'shadow-[0_0_50px_rgba(251,191,36,0.3)]', // Reduced from 0.6
    trimurti: 'shadow-[0_0_35px_rgba(245,158,11,0.2)]', // Reduced from 0.4
    prajapati: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]', // Reduced from 0.3
    human: 'shadow-[0_0_10px_rgba(100,116,139,0.1)]',   // Reduced from 0.3
    special: 'shadow-[0_0_20px_rgba(217,70,239,0.1)]',  // Reduced from 0.4
  },

  // Inner Gradients (for Image fallbacks or subtle overlays)
  gradients: {
    supreme: 'from-amber-900/40 via-amber-600/10 to-transparent',
    trimurti: 'from-blue-900/40 via-indigo-600/10 to-transparent',
    prajapati: 'from-cyan-900/40 via-teal-600/10 to-transparent',
    human: 'from-slate-800/40 via-zinc-600/10 to-transparent',
    special: 'from-fuchsia-900/40 via-purple-600/10 to-transparent',
  },
  
  // Node Sizes - Scaled based on Cosmic Importance
  nodeSizes: {
    supreme: { width: 350, height: 180 }, // Parabrahman, Avatars
    cosmic: { width: 280, height: 140 },  // Trimurti, Prajapatis
    major: { width: 220, height: 110 },   // Indra, Surya
    secondary: { width: 180, height: 90 },
    minor: { width: 140, height: 70 },
    cluster: { width: 300, height: 120 },
    default: { width: 180, height: 90 },
    // Backwards compatibility
    trimurti: { width: 280, height: 140 },
    prajapati: { width: 220, height: 110 },
    human: { width: 180, height: 90 },
    special: { width: 220, height: 110 },
  },
};

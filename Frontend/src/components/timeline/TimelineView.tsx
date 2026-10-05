import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { 
  Clock, Star, Circle, Shield, Sparkles, BookOpen, Crown, Scale, 
  ArrowRight, Activity, Sun, Moon, Zap, Heart, Eye
} from 'lucide-react';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';

// === DATA ===
const YUGA_DATA = [
  { 
    id: 'satya', 
    name: 'Satya Yuga', 
    duration: 1728000, 
    dharma: 100, 
    color: 'from-amber-100 to-white', 
    bg: 'bg-white/10',
    shadow: 'shadow-[0_0_50px_rgba(255,255,255,0.4)]',
    text: 'text-white',
    icon: Sun,
    theme: 'Pure white-gold light',
    teaching: 'Dharma on four legs. Truth everywhere. No greed. Long lifespan. Deep meditation.',
    message: 'Inner Realization',
    events: ['Creation of the Universe', 'Dhruva Maharaj', 'Prahlada', 'Narasimha Avatar', 'Kapila Muni']
  },
  { 
    id: 'treta', 
    name: 'Treta Yuga', 
    duration: 1296000, 
    dharma: 75, 
    color: 'from-orange-400 to-amber-500', 
    bg: 'bg-orange-500/10',
    shadow: 'shadow-[0_0_50px_rgba(249,115,22,0.4)]',
    text: 'text-orange-400',
    icon: Crown,
    theme: 'Golden sunlight',
    teaching: 'Dharma on three legs. Rise of rituals and sacrifices. Duty becomes paramount.',
    message: 'Duty and Righteousness',
    events: ['Vamana Avatar', 'Parashurama', 'Ganga Avataran', 'Ramayana', 'Rama Rajya']
  },
  { 
    id: 'dvapara', 
    name: 'Dvapara Yuga', 
    duration: 864000, 
    dharma: 50, 
    color: 'from-blue-400 to-indigo-600', 
    bg: 'bg-blue-500/10',
    shadow: 'shadow-[0_0_50px_rgba(59,130,246,0.4)]',
    text: 'text-blue-400',
    icon: Shield,
    theme: 'Royal blue',
    teaching: 'Dharma on two legs. Decline in virtue, rise of complex desires.',
    message: 'Choose Dharma Despite Confusion',
    events: ['Krishna Avatar', 'Mahabharata', 'Bhagavad Gita Spoken', 'Kurukshetra War']
  },
  { 
    id: 'kali', 
    name: 'Kali Yuga', 
    duration: 432000, 
    dharma: 25, 
    color: 'from-purple-600 to-fuchsia-900', 
    bg: 'bg-purple-900/20',
    shadow: 'shadow-[0_0_50px_rgba(147,51,234,0.4)]',
    text: 'text-purple-400',
    icon: Eye,
    theme: 'Dark cosmic purple',
    teaching: 'Dharma on one leg. Age of hypocrisy, conflict, and rapid spiritual decline.',
    message: 'Even in darkness, devotion gives liberation',
    events: ['Beginning 3102 BCE', 'Current Era', 'Bhakti Movement', 'Future Kalki Avatar']
  }
];

const TOTAL_MAHAYUGA = 4320000;

export default function TimelineView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize Vanilla Lenis for the inner scroll container
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: contentRef.current,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full z-10 pointer-events-auto bg-[#030712]/90"
    >
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as any}
      >
        <div ref={contentRef} className="w-full flex flex-col h-max">
      {/* ── SECTION 1: COSMIC CLOCK (HERO) ── */}
      <header className="relative w-full min-h-[100svh] pt-32 flex flex-col items-center justify-center p-8 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border-[1px] border-amber-500/10 border-dashed opacity-50 animate-[spin_120s_linear_infinite] will-change-transform"
        />
        <div 
          className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border-[2px] border-amber-400/5 opacity-30 animate-[spin_200s_linear_infinite_reverse] will-change-transform"
        />

        <div className="relative z-10 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            {/* The Golden Wheel */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-12 flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full border-4 border-amber-500/30 shadow-[0_0_100px_rgba(245,158,11,0.2)] animate-[spin_40s_linear_infinite] will-change-transform"
              >
                {/* Spokes */}
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-amber-500/40 via-transparent to-amber-500/40 origin-center" style={{ transform: `rotate(${i * 30}deg)` }} />
                ))}
              </div>
              
              <div className="absolute inset-4 rounded-full bg-black/80 border border-amber-400/20 flex flex-col items-center justify-center">
                <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase mb-2">You Are Here</span>
                <h1 className="text-3xl md:text-5xl font-bold cinzel-text text-amber-100 uppercase tracking-widest drop-shadow-lg">
                  Kali Yuga
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl w-full"
          >
            <StatCard label="Started" value="3102 BCE" />
            <StatCard label="Elapsed" value="~5,126 YRS" />
            <StatCard label="Remaining" value="426,874 YRS" />
            <StatCard label="Dharma" value="25%" highlight />
          </motion.div>

          <div 
            className="mt-24 text-amber-500/50 flex flex-col items-center animate-[pulse_3s_ease-in-out_infinite]"
          >
            <span className="text-xs tracking-[0.3em] uppercase mb-4">Descend into Time</span>
            <div className="w-px h-16 bg-gradient-to-b from-amber-500/50 to-transparent" />
          </div>
        </div>
      </header>

      {/* ── SECTION 2: MAHAYUGA VISUALIZATION ── */}
      <section className="w-full min-h-[80svh] py-24 px-8 flex flex-col justify-center max-w-7xl mx-auto relative">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-100 uppercase tracking-widest cinzel-text mb-4">The Mahayuga</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg tracking-wide">
            One complete cycle of four Yugas spans 4,320,000 human years. Notice the shrinking duration—as time progresses, virtue and human capacity diminish.
          </p>
        </div>

        <div className="w-full h-32 md:h-48 flex rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
          {YUGA_DATA.map((yuga, i) => {
            const percentage = (yuga.duration / TOTAL_MAHAYUGA) * 100;
            return (
              <motion.div
                key={yuga.id}
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: `${percentage}%`, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                className={`relative group h-full bg-gradient-to-br ${yuga.color} border-r border-black/20 flex flex-col items-center justify-center cursor-crosshair overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="relative z-10 text-center px-2">
                  <span className="block text-white/90 font-bold uppercase tracking-widest text-xs md:text-lg cinzel-text mb-1 drop-shadow-md">{yuga.name}</span>
                  <span className="hidden md:block text-white/70 text-[10px] md:text-xs font-mono">{yuga.duration.toLocaleString()} YRS</span>
                  <span className="hidden md:block text-white/50 text-[10px] mt-2 font-bold">{Math.round(percentage)}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: THE DHARMA WHEEL ── */}
      <section className="w-full min-h-[100svh] py-24 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-100 uppercase tracking-widest cinzel-text mb-4">The Bull of Dharma</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg tracking-wide">
            In Satya Yuga, Dharma stands firmly on four legs: Austerity, Purity, Compassion, and Truth. With each age, one leg is lost.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-8 z-10">
          {YUGA_DATA.map((yuga, i) => (
            <motion.div
              key={yuga.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`p-8 rounded-2xl border border-white/10 ${yuga.bg} relative overflow-hidden group`}
            >
              <div className="flex justify-between items-start mb-6">
                <yuga.icon className={`w-8 h-8 ${yuga.text}`} />
                <span className={`text-2xl font-bold ${yuga.text}`}>{yuga.dharma}%</span>
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-2 cinzel-text">{yuga.name}</h3>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4].map((leg) => (
                  <div 
                    key={leg} 
                    className={`h-2 flex-1 rounded-sm ${leg <= (yuga.dharma / 25) ? 'bg-amber-400' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: YUGA DETAIL PAGES ── */}
      <article className="relative">
        {YUGA_DATA.map((yuga, index) => (
          <section key={yuga.id} className="w-full min-h-screen py-24 px-8 md:px-16 flex flex-col justify-center relative bg-[#030712]">
            <div className={`absolute inset-0 bg-gradient-to-b ${yuga.bg} opacity-50`} />
            
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-200px" }}
                transition={{ duration: 1 }}
              >
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-6`}>
                  <yuga.icon className={`w-4 h-4 ${yuga.text}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${yuga.text}`}>{yuga.theme}</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-widest cinzel-text mb-4 drop-shadow-lg">
                  {yuga.name}
                </h2>
                <h3 className={`text-2xl font-serif tracking-widest ${yuga.text} mb-8`}>
                  {yuga.message}
                </h3>
                
                <p className="text-slate-300 text-xl leading-relaxed mb-10 border-l-2 border-white/20 pl-6 py-2">
                  {yuga.teaching}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-black/40 border border-white/10">
                    <span className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Duration</span>
                    <span className="text-2xl font-mono text-white">{yuga.duration.toLocaleString()}</span>
                  </div>
                  <div className="p-6 rounded-xl bg-black/40 border border-white/10">
                    <span className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Dharma Level</span>
                    <span className={`text-2xl font-bold ${yuga.text}`}>{yuga.dharma}%</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Events */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-200px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${yuga.color} opacity-10`} />
                <div className="relative bg-[#050a15] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <h4 className="text-sm text-slate-400 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Major Cosmic Events</h4>
                  <ul className="space-y-6">
                    {yuga.events.map((event, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${yuga.color} ${yuga.shadow}`} />
                        <span className="text-lg md:text-xl text-slate-200">{event}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </article>

      {/* ── SECTION 5: KALI YUGA EXPLAINER ── */}
      <section className="w-full min-h-screen py-32 px-8 flex flex-col justify-center items-center relative bg-gradient-to-b from-[#030712] to-[#0f0114]">
        <div className="text-center mb-20 max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-purple-400 uppercase tracking-widest cinzel-text mb-6">The Paradox of Kali Yuga</h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            We are currently in Kali Yuga, the age of quarrel and hypocrisy. Yet, the scriptures reveal a profound secret: the spiritual rewards in this darkest age are uniquely magnified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full z-10">
          {/* Shadow Side */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-black/80 border border-red-900/30"
          >
            <div className="flex items-center gap-3 mb-8">
              <Moon className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-red-100 uppercase tracking-widest cinzel-text">The Shadow</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Rise of greed, ego, and materialism',
                'Global conflict and natural disturbances',
                'Shortened human lifespan and memory',
                'Loss of spiritual knowledge',
                'Hypocrisy disguised as virtue'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-red-200/70">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Light Side */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-3xl bg-purple-900/30 border border-fuchsia-500/30 shadow-[0_0_50px_rgba(147,51,234,0.1)]"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-fuchsia-400" />
              <h3 className="text-2xl font-bold text-fuchsia-100 uppercase tracking-widest cinzel-text">The Hidden Light</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Spiritual progress happens incredibly fast',
                'No need for severe, impossible austerities',
                'Mere intention for good bears fruit',
                'Chanting the Holy Name grants liberation',
                'Simple devotion (Bhakti) is the supreme path'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-fuchsia-100/90">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-fuchsia-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: WHY KALI YUGA IS SPECIAL (BHAKTI PATH) ── */}
      <section className="w-full min-h-[90svh] py-24 px-8 flex flex-col justify-center items-center relative overflow-hidden bg-[#0f0114]">
        
        {/* Glowing Mantra BG */}
        <div 
          className="absolute text-center opacity-20 pointer-events-none select-none z-0 overflow-hidden w-full flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]"
        >
          <div className="text-[120px] md:text-[200px] font-bold text-fuchsia-900 whitespace-nowrap cinzel-text tracking-widest blur-sm">
            HARE KRISHNA
          </div>
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-fuchsia-900/30 border border-fuchsia-500/50 mb-8 shadow-[0_0_40px_rgba(217,70,239,0.3)]">
            <Heart className="w-10 h-10 text-fuchsia-400" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-fuchsia-100 uppercase tracking-widest cinzel-text mb-8">
            The Supreme Path Today
          </h2>
          
          <div className="bg-black/60 border border-fuchsia-500/20 p-8 md:p-12 rounded-3xl mb-12">
            <p className="text-2xl md:text-3xl font-serif text-fuchsia-300 italic mb-6">
              "Harer Nama Harer Nama Harer Nama Eva Kevalam<br/>
              Kalau Nasty Eva Nasty Eva Nasty Eva Gatir Anyatha"
            </p>
            <p className="text-fuchsia-100/60 uppercase tracking-widest text-sm">— Bhagavata Purana & Brhan-naradiya Purana</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['Naam Japa', 'Bhagavad Gita', 'Satsang', 'Seva', 'Charity', 'Bhakti'].map((practice, i) => (
              <motion.div
                key={practice}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="px-6 py-3 rounded-full bg-fuchsia-900/20 border border-fuchsia-500/40 text-fuchsia-200 font-bold tracking-widest uppercase text-sm hover:bg-fuchsia-800/40 transition-colors cursor-default"
              >
                {practice}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FUTURE OF TIME ── */}
      <section className="w-full min-h-[100svh] py-32 flex flex-col justify-center items-center relative overflow-hidden bg-black">
        {/* Pralaya Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-60" />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="p-4 rounded-full bg-slate-900 border border-slate-700">
              <span className="text-slate-300 uppercase tracking-widest text-xs font-bold">You (Kali Yuga)</span>
            </div>
            
            <div className="w-px h-16 bg-gradient-to-b from-slate-700 to-transparent" />
            
            <div 
              className="p-6 rounded-full bg-sky-900/40 border border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-[pulse_3s_ease-in-out_infinite]"
            >
              <Zap className="w-8 h-8 text-sky-400" />
            </div>
            <span className="text-sky-300 uppercase tracking-widest font-bold text-xl cinzel-text">Kalki Avatar</span>
            
            <div className="w-px h-16 bg-gradient-to-b from-sky-500/50 to-transparent" />
            
            <div className="p-4 rounded-full bg-red-900/20 border border-red-500/30">
              <span className="text-red-400 uppercase tracking-widest text-sm font-bold">Pralaya (Dissolution)</span>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-red-500/30 to-amber-500/30" />
            
            <motion.div 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2 }}
              className="p-8 rounded-full bg-amber-500/10 border border-amber-500/50 shadow-[0_0_100px_rgba(245,158,11,0.2)]"
            >
              <Sun className="w-12 h-12 text-amber-400" />
            </motion.div>
            <span className="text-amber-300 uppercase tracking-widest font-bold text-2xl cinzel-text">New Satya Yuga</span>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-32 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest cinzel-text mb-6">
              Dharma Never Dies.
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-slate-400 uppercase tracking-widest">
              It only waits to rise again.
            </h2>
          </motion.div>
        </div>
      </section>

        </div>
      </div>
    </motion.div>
  );
}

// Reusable stat card
const StatCard = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
  <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${highlight ? 'border-amber-400/50 bg-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'border-white/10 bg-black/60'}`}>
    <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</span>
    <span className={`text-xl md:text-3xl font-bold font-mono tracking-wider ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>
      {value}
    </span>
  </div>
);

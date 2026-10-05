import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Shield, BookOpen, Crown, Zap, MapPin, Navigation, X, Info, Users, Flag, ScrollText, ChevronDown, ChevronUp } from 'lucide-react';

interface Loka {
  id: string; name: string; sanskrit: string; category: 'upper'|'earth'|'lower';
  ruler: string; residents: string; purpose: string; significance: string;
  description: string; famousBeings: string[]; relatedStories: string[];
  rgb: string; hex: string; icon: any; bgImg: string; level: number;
}

const BG = {
  u: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1400&auto=format&fit=crop",
  e: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1400&auto=format&fit=crop",
  l: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1400&auto=format&fit=crop",
};

const LOKAS: Loka[] = [
  { id:'satya',    name:'Satyaloka',  sanskrit:'सत्यलोक',   category:'upper', level:14, ruler:'Lord Brahma',        residents:'Liberated Souls, Brahmarshis', purpose:'Realm of Absolute Truth',          significance:'The highest realm. Souls here transcend rebirth entirely.', description:'Supreme abode of Lord Brahma — eternal pure white light, free from sorrow, aging, and death.', famousBeings:['Lord Brahma','Goddess Saraswati'], relatedStories:['Creation of the Universe','Origin of the Vedas'], rgb:'255,253,230', hex:'#fef9c3', icon:Sparkles,   bgImg:BG.u },
  { id:'tapo',     name:'Tapoloka',   sanskrit:'तपोलोक',    category:'upper', level:13, ruler:'Vairagis',            residents:'Immortal Ascetic Sages',       purpose:'Realm of Supreme Penance',         significance:'Pure consciousness through eternal Tapas.', description:'Realm of spiritual fire where immortal sages perform eternal Tapas to maintain cosmic balance.', famousBeings:['Sanaka','Sanandana','Sanatkumara'], relatedStories:['The eternal youth of the Kumaras'], rgb:'253,230,138', hex:'#fde68a', icon:Eye,        bgImg:BG.u },
  { id:'jana',     name:'Janaloka',   sanskrit:'जनलोक',     category:'upper', level:12, ruler:'Sons of Brahma',      residents:'Siddhas, Spiritual Masters',   purpose:'Realm of Creative Divine Energy',  significance:'Safe haven for evolved souls during cosmic dissolution.', description:'Joyful realm where spiritually advanced souls move freely through the cosmos.', famousBeings:['Bhrigu','Prajapatis'], relatedStories:['Sages retreating during Pralaya'], rgb:'251,191,36',  hex:'#fbbf24', icon:Shield,     bgImg:BG.u },
  { id:'mahar',    name:'Maharloka',  sanskrit:'महर्लोक',   category:'upper', level:11, ruler:'Great Rishis',        residents:'Rishis, Munis',                purpose:'Realm of Great Saints',            significance:'Gateway between perishable and eternal worlds.', description:'Luminous realm of great sages who live for one full kalpa — a day of Brahma.', famousBeings:['Sage Markandeya'], relatedStories:['Markandeya surviving the cosmic flood'], rgb:'245,158,11',  hex:'#f59e0b', icon:BookOpen,   bgImg:BG.u },
  { id:'svarga',   name:'Svargaloka', sanskrit:'स्वर्गलोक', category:'upper', level:10, ruler:'Indra',               residents:'Devas, Gandharvas, Apsaras',   purpose:'Heaven — Celestial Enjoyment',     significance:'Paradise for souls of supreme merit.', description:'Heavenly realm of celestial music, amrita nectar, and the wish-fulfilling Kalpavriksha tree.', famousBeings:['Indra','Agni','Kamadhenu'], relatedStories:['Samudra Manthan (Churning of the Ocean)'], rgb:'249,115,22',  hex:'#f97316', icon:Crown,      bgImg:BG.u },
  { id:'bhuvar',   name:'Bhuvarloka', sanskrit:'भुवर्लोक',  category:'upper', level:9,  ruler:'Vayu / Sun God',      residents:'Yakshas, Vidyadharas, Spirits',purpose:'The Cosmic Atmosphere & Space',    significance:'Bridge realm — all planets orbit and cosmic energies flow.', description:'Vast atmospheric space between Earth and Heaven containing all planets and stars.', famousBeings:['Navagrahas (Nine Planets)'], relatedStories:['Flight of Hanuman','Movement of Surya'], rgb:'56,189,248',  hex:'#38bdf8', icon:Zap,        bgImg:BG.u },
  { id:'bhu',      name:'Bhuloka',    sanskrit:'भूलोक',     category:'earth', level:8,  ruler:'Manu / Humanity',     residents:'Humans, Animals, All Life',    purpose:'Karma-Bhumi — Sacred Realm of Action', significance:'The ONLY realm where Karma is created. Even Devas must take birth here for Moksha.', description:'Our physical earthly dimension — the spiritual epicenter where souls forge their destiny through free will.', famousBeings:['All Avatars of Vishnu','All of Humanity'], relatedStories:['Mahabharata','Ramayana'], rgb:'16,185,129',  hex:'#10b981', icon:MapPin,     bgImg:BG.e },
  { id:'atala',    name:'Atala',      sanskrit:'अतल',       category:'lower', level:7,  ruler:'Bala (Son of Maya)',   residents:'Mystical Women, Illusionists', purpose:'Realm of Illusion & Enchantment',  significance:'A realm of immense beauty and enchantment.', description:'First subterranean realm — famous for a magical potion granting irresistible charm and vigor.', famousBeings:['Bala'], relatedStories:['Illusions of Maya Danava'], rgb:'129,140,248', hex:'#818cf8', icon:Sparkles,   bgImg:BG.l },
  { id:'vitala',   name:'Vitala',     sanskrit:'वितल',      category:'lower', level:6,  ruler:'Hatakeshwara Shiva',   residents:'Ganas, Yogis, Miners',         purpose:'Realm of Spiritual Gold',          significance:'Where Lord Shiva dwells in his golden Hatakeshwara form.', description:'Deeply spiritual subterranean realm lit by Hataka gold where Shiva is worshipped continuously.', famousBeings:['Lord Shiva (Hatakeshwara)'], relatedStories:['Creation of Hataka Gold'], rgb:'167,139,250', hex:'#a78bfa', icon:Shield,     bgImg:BG.l },
  { id:'sutala',   name:'Sutala',     sanskrit:'सुतल',      category:'lower', level:5,  ruler:'King Bali',            residents:'Virtuous Asuras',              purpose:'Realm of Royal Devotion',          significance:'More opulent than Svarga — gifted by Vishnu to his greatest devotee.', description:'Ruled by righteous King Bali. Lord Vamana himself stands guard at these gates.', famousBeings:['Mahabali','Vamana Avatar (as guard)'], relatedStories:['Vamana Avatar and King Bali'], rgb:'217,70,239',  hex:'#d946ef', icon:Crown,      bgImg:BG.l },
  { id:'talatala', name:'Talatala',   sanskrit:'तलातल',     category:'lower', level:4,  ruler:'Maya Danava',          residents:'Architects, Sorcerers',        purpose:'Realm of Cosmic Architecture',     significance:'Center for material science, sorcery, and supreme illusion.', description:'Maya Danava, greatest cosmic architect, builds flying cities and magical weapons here.', famousBeings:['Maya Danava'], relatedStories:['Building of the Tripura (Three Cities)'], rgb:'244,63,94',   hex:'#f43f5e', icon:Navigation, bgImg:BG.l },
  { id:'mahatala', name:'Mahatala',   sanskrit:'महातल',     category:'lower', level:3,  ruler:'Many-Hooded Nagas',    residents:'Kuhu, Kuhaka, Takshaka',       purpose:'Realm of Serpentine Power',        significance:'Fiercely protected domain of giant multi-hooded serpents.', description:'Inhabited by descendants of Kadru — living in opulence but in eternal fear of Garuda.', famousBeings:['Kuhu','Takshaka'], relatedStories:['Eternal enmity with Garuda'], rgb:'239,68,68',   hex:'#ef4444', icon:Eye,        bgImg:BG.l },
  { id:'rasatala', name:'Rasatala',   sanskrit:'रसातल',     category:'lower', level:2,  ruler:'Daityas & Danavas',    residents:'Powerful Asuras',              purpose:'Stronghold of Cosmic Enmity',      significance:'Eternal stronghold of the enemies of the Devas.', description:'Subterranean military stronghold where Asuras constantly plot against the heavens.', famousBeings:['Nivatakavachas'], relatedStories:['Battles with Indra'], rgb:'220,38,38',   hex:'#dc2626', icon:Shield,     bgImg:BG.l },
  { id:'patala',   name:'Patala',     sanskrit:'पाताल',     category:'lower', level:1,  ruler:'Vasuki',               residents:'Nagas, Divine Serpents',       purpose:'The Jewel-Lit Deepest Realm',      significance:'The lowest dimension — lit entirely by the brilliance of Naga gemstones.', description:'No sunlight exists here. The entire realm glows from radiant jewels on the hoods of Nagas.', famousBeings:['Vasuki','Adisesha','Shankha'], relatedStories:['Kurma Avatar holding the Earth above Patala'], rgb:'139,92,246',  hex:'#8b5cf6', icon:Sparkles,   bgImg:BG.l },
];

// 3D Disc Component
function Disc3D({ loka, size = 340 }: { loka: Loka; size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer ambient glow */}
      <div className="absolute rounded-full opacity-20 animate-pulse"
        style={{ width: size * 1.4, height: size * 1.4, background: `radial-gradient(circle, rgba(${loka.rgb},0.6) 0%, transparent 70%)` }} />

      {/* The 3D disc stack */}
      <div className="absolute" style={{ width: size, height: size, perspective: '900px' }}>
        <div style={{ width: '100%', height: '100%', transform: 'rotateX(72deg)', transformStyle: 'preserve-3d', position: 'relative' }}>

          {/* Disc body — top surface */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, rgba(${loka.rgb},0.25) 0%, rgba(0,0,0,0.95) 65%)`,
              boxShadow: `0 0 0 3px rgba(${loka.rgb},0.9), 0 0 40px rgba(${loka.rgb},0.7), 0 0 100px rgba(${loka.rgb},0.3), inset 0 2px 30px rgba(${loka.rgb},0.2)`,
            }}
          />

          {/* Disc thickness layers (simulate 3D depth) */}
          {[8, 16, 24].map((offset, i) => (
            <div key={i} className="absolute inset-0 rounded-full"
              style={{
                transform: `translateZ(-${offset}px)`,
                background: `rgba(${loka.rgb},${0.04 - i * 0.01})`,
                boxShadow: `0 0 0 2px rgba(${loka.rgb},${0.4 - i * 0.12})`,
              }}
            />
          ))}

          {/* Orbiting particle */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
              <div className="absolute top-1/2 left-0 w-5 h-5 -translate-y-1/2 -translate-x-1/2 rounded-full"
                style={{ background: `rgba(${loka.rgb},1)`, boxShadow: `0 0 20px 8px rgba(${loka.rgb},0.8)` }} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Center icon */}
      <div className="absolute z-10 flex flex-col items-center gap-2 pointer-events-none">
        <loka.icon className="w-10 h-10 drop-shadow-lg" style={{ color: loka.hex }} />
        <div className="font-serif text-sm tracking-widest" style={{ color: `rgba(${loka.rgb},0.7)` }}>{loka.sanskrit}</div>
      </div>
    </div>
  );
}

// Single Loka Section
function LokaSection({ loka, index, isActive, onVisible }: { loka: Loka; index: number; isActive: boolean; onVisible: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEarth = loka.category === 'earth';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) onVisible(loka.id); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [loka.id, onVisible]);

  return (
    <div ref={ref} className="relative w-full flex-shrink-0" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${loka.bgImg})` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(${loka.rgb},0.08) 0%, transparent 60%), linear-gradient(to bottom, #01030a, rgba(1,3,10,0.7) 50%, #01030a)` }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6 md:px-16 gap-12 md:gap-20 pt-32 pb-16">

        {/* LEFT: 3D Disc */}
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex-shrink-0 hidden md:flex flex-col items-center gap-6"
        >
          <Disc3D loka={loka} size={320} />

          {isEarth && (
            <div className="bg-emerald-500 text-black font-extrabold uppercase tracking-[0.25em] text-xs px-6 py-2 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.9)] animate-pulse">
              ● YOU ARE HERE
            </div>
          )}
        </motion.div>

        {/* RIGHT: Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="flex-1 max-w-lg overflow-y-auto max-h-[calc(100vh-140px)]"
          style={{ scrollbarWidth: 'none' } as any}
        >
          {/* Realm badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-4"
            style={{ borderColor: `rgba(${loka.rgb},0.3)`, background: `rgba(${loka.rgb},0.07)`, color: loka.hex }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: loka.hex, boxShadow: `0 0 6px ${loka.hex}` }} />
            Level {loka.level} · {loka.category === 'upper' ? 'Higher' : loka.category === 'earth' ? 'Middle' : 'Lower'} Planet
          </div>

          {/* Name */}
          <h2 className="text-4xl md:text-5xl font-bold cinzel-text text-white leading-none mb-1.5" style={{ textShadow: `0 0 60px rgba(${loka.rgb},0.5)` }}>
            {loka.name}
          </h2>
          <p className="text-lg font-serif mb-4" style={{ color: `rgba(${loka.rgb},0.8)` }}>{loka.sanskrit}</p>

          {/* Purpose */}
          <p className="text-base text-white/80 font-light leading-relaxed mb-5 border-l-2 pl-4" style={{ borderColor: `rgba(${loka.rgb},0.5)` }}>
            {loka.purpose}
          </p>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[['Ruler', loka.ruler, Flag], ['Residents', loka.residents, Users]].map(([label, val, Icon]: any) => (
              <div key={label} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest mb-1" style={{ color: `rgba(${loka.rgb},0.6)` }}>
                  <Icon className="w-3 h-3" />{label}
                </div>
                <p className="text-white font-semibold text-sm">{val}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{loka.description}</p>

          {/* Famous Beings */}
          <div className="flex flex-wrap gap-2 mb-4">
            {loka.famousBeings.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 text-slate-200">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: loka.hex }} />
                {b}
              </span>
            ))}
          </div>

          {/* Significance — glowing quote-style highlight */}
          <div className="relative rounded-xl px-4 py-3 mb-4 overflow-hidden"
            style={{ background: `linear-gradient(135deg, rgba(${loka.rgb},0.08) 0%, rgba(0,0,0,0.3) 100%)`, border: `1px solid rgba(${loka.rgb},0.2)` }}>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl" style={{ background: `linear-gradient(to bottom, ${loka.hex}, transparent)` }} />
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-1 pl-2" style={{ color: `rgba(${loka.rgb},0.65)` }}>✦ Cosmic Significance</p>
            <p className="text-slate-200 text-xs leading-relaxed pl-2 italic">{loka.significance}</p>
          </div>

          {/* Related Stories */}
          {loka.relatedStories.length > 0 && (
            <div className="pb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2" style={{ color: `rgba(${loka.rgb},0.5)` }}>📜 Sacred Lore</p>
              <div className="flex flex-wrap gap-1.5">
                {loka.relatedStories.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: `rgba(${loka.rgb},0.1)`, border: `1px solid rgba(${loka.rgb},0.25)`, color: loka.hex }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll hint (only for non-last) */}
      {index < LOKAS.length - 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
        </div>
      )}
    </div>
  );
}

// ─── Garbhodaka Ocean — Lord Vishnu Anantashayana Section ────────────────────
function VishnuSection() {
  return (
    <div className="absolute inset-0">

      {/* Full-bleed image — centered so Vishnu is fully visible */}
      <img
        src="/vishnu.png"
        alt="Lord Maha-Vishnu resting on Adisesha in the Garbhodaka Ocean"
        className="w-full h-full object-cover object-center"
        style={{ filter: 'brightness(0.75) saturate(1.2)' }}
      />

      {/* Top dark fade — clears the fixed navbar (72px tall) */}
      <div className="absolute top-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to bottom, rgba(1,2,15,0.92) 0%, transparent 100%)' }} />

      {/* Bottom dark fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to top, rgba(1,2,15,0.95) 0%, transparent 100%)' }} />

      {/* Shimmer wave lines near bottom */}
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          animate={{ scaleX: [1, 1.07, 1], opacity: [0.18, 0.5, 0.18] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          className="absolute left-0 right-0 h-px"
          style={{ bottom: `${48 + i * 14}px`, background: 'linear-gradient(to right, transparent 5%, rgba(140,90,255,0.6) 30%, rgba(200,150,255,0.95) 50%, rgba(140,90,255,0.6) 70%, transparent 95%)' }}
        />
      ))}

      {/* Title — top, below navbar, clearly visible */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-24 text-center pointer-events-none">
        <p className="text-violet-300/50 tracking-[0.55em] uppercase text-[10px] font-bold mb-2">
          Below All 14 Lokas · The Foundation of Creation
        </p>
        <h2 className="cinzel-text text-4xl md:text-6xl font-bold tracking-[0.12em] uppercase"
          style={{ color: 'rgba(230,210,255,0.97)', textShadow: '0 0 100px rgba(139,92,246,0.9), 0 0 40px rgba(139,92,246,0.5)' }}>
          Garbhodaka Ocean
        </h2>
      </div>

      {/* Description — bottom, above the fade */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-10 px-6 text-center pointer-events-none">
        <p className="text-slate-200/75 text-sm md:text-base max-w-2xl leading-relaxed">
          The primordial causal waters where{' '}
          <span className="text-violet-200 font-semibold">Lord Maha-Vishnu</span> reposes upon{' '}
          <span className="text-violet-200 font-semibold">Adisesha</span> — the thousand-hooded cosmic serpent.
          From His navel emerges the lotus of creation, from which Lord Brahma was born.
        </p>
      </div>

    </div>
  );
}



export default function UniverseMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(LOKAS[0].id);

  const [showNav, setShowNav] = useState(false);

  const activeLoka = LOKAS.find(l => l.id === activeId) || LOKAS[0];
  const activeIndex = LOKAS.findIndex(l => l.id === activeId);

  const handleVisible = useCallback((id: string) => setActiveId(id), []);

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
    setShowNav(false);
  };

  const scrollNext = () => scrollTo(Math.min(activeIndex + 1, LOKAS.length - 1));
  const scrollPrev = () => scrollTo(Math.max(activeIndex - 1, 0));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="absolute inset-0 w-full h-full z-10 bg-[#01030a] pointer-events-auto overflow-hidden">

      {/* CSS Starfield */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(1px 1px at 5% 10%, rgba(255,255,255,0.9) 0%, transparent 100%), radial-gradient(1px 1px at 20% 60%, rgba(255,255,255,0.7) 0%, transparent 100%), radial-gradient(1px 1px at 50% 15%, rgba(255,255,255,0.8) 0%, transparent 100%), radial-gradient(2px 2px at 75% 75%, rgba(255,255,255,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.7) 0%, transparent 100%), radial-gradient(1px 1px at 38% 85%, rgba(255,255,255,0.5) 0%, transparent 100%)', backgroundSize: '500px 500px' }} />

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(to bottom, rgba(1,3,10,0.95), transparent)' }}>
        <div>
          <h1 className="text-white font-bold cinzel-text tracking-[0.3em] uppercase text-sm md:text-base">14 Lokas · Cosmic Atlas</h1>
          <p className="text-xs tracking-widest" style={{ color: activeLoka.hex }}>Level {activeLoka.level} — {activeLoka.name}</p>
        </div>

        {/* Nav Dots Button */}
        <button onClick={() => setShowNav(v => !v)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 hover:bg-white/10 transition-colors">
          {showNav ? 'Close' : 'All Lokas'}
        </button>
      </div>

      {/* Fullscreen Nav Overlay */}
      <AnimatePresence>
        {showNav && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8">
            <button onClick={() => setShowNav(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white"><X className="w-5 h-5" /></button>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {LOKAS.map((l, i) => (
                <button key={l.id} onClick={() => scrollTo(i)}
                  className={`p-4 rounded-2xl border text-left transition-all hover:scale-105 ${activeId === l.id ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                  style={activeId === l.id ? { boxShadow: `0 0 20px rgba(${l.rgb},0.4)` } : {}}>
                  <div className="w-2.5 h-2.5 rounded-full mb-2" style={{ background: l.hex, boxShadow: `0 0 8px ${l.hex}` }} />
                  <div className="font-bold cinzel-text text-sm text-white">{l.name}</div>
                  <div className="text-xs font-serif" style={{ color: l.hex }}>{l.sanskrit}</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Level {l.level}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Progress Bar */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 items-center">
        {LOKAS.map((l, i) => (
          <button key={l.id} onClick={() => scrollTo(i)} title={l.name}
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeId === l.id ? 8 : 4,
              height: activeId === l.id ? 8 : 4,
              background: activeId === l.id ? l.hex : 'rgba(255,255,255,0.2)',
              boxShadow: activeId === l.id ? `0 0 10px ${l.hex}` : 'none',
            }}
          />
        ))}
      </div>

      {/* Keyboard / Arrow Nav */}
      <div className="fixed right-5 bottom-1/2 translate-y-1/2 z-30 flex flex-col gap-3">
        <button onClick={scrollPrev} disabled={activeIndex === 0}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/15 disabled:opacity-20 transition-all">
          <ChevronUp className="w-4 h-4" />
        </button>
        <button onClick={scrollNext} disabled={activeIndex === LOKAS.length - 1}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/15 disabled:opacity-20 transition-all">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="w-full h-full overflow-y-auto" style={{ scrollSnapType: 'y mandatory', scrollbarWidth: 'none', scrollBehavior: 'smooth' } as any}>
        {LOKAS.map((loka, i) => (
          <LokaSection key={loka.id} loka={loka} index={i} isActive={activeId === loka.id} onVisible={handleVisible} />
        ))}

        {/* Garbhodaka Ocean — Full Screen Vishnu Section */}
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', scrollSnapAlign: 'start', background: '#01020a' }}>
          {/* Full-bleed Vishnu Image as background */}
          <VishnuSection />
        </div>
      </div>
    </motion.div>
  );
}

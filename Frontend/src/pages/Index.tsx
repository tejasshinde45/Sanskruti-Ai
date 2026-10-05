import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Heart, Lightbulb, Mic, Trophy, Map, Users, Award, Sparkles, Star, HeartHandshake, QrCode, CreditCard, X, ShieldCheck } from 'lucide-react';
import ModuleCard from '@/components/shared/ModuleCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDynamicLeaderboard } from '@/lib/quizData';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

const modules = [
  {
    title: 'Scripture Explainer',
    description: 'Explore sacred texts with AI-powered multi-level explanations',
    icon: BookOpen,
    color: 'from-primary/80 to-primary',
    path: '/scripture',
    stats: '50+ Shlokas Available'
  },
  {
    title: 'Festival Intelligence',
    description: 'Discover the stories, rituals, and significance of Indian festivals',
    icon: Calendar,
    color: 'from-secondary/80 to-secondary',
    path: '/festivals',
    stats: '25+ Festivals Covered'
  },
  {
    title: 'Cultural Recommender',
    description: 'Get personalized wisdom based on your mood and interests',
    icon: Heart,
    color: 'from-accent/80 to-accent',
    path: '/recommender',
    stats: 'Personalized Experience'
  },
  {
    title: 'Knowledge Capsules',
    description: 'Bite-sized insights on art, dance, medicine, and philosophy',
    icon: Lightbulb,
    color: 'from-chart-1/80 to-chart-1',
    path: '/knowledge',
    stats: '100+ Topics'
  },
  {
    title: 'Voice Q&A',
    description: 'Ask questions in your language and get audio responses',
    icon: Mic,
    color: 'from-chart-2/80 to-chart-2',
    path: '/voice-qa',
    stats: 'Multi-language Support'
  },
  {
    title: 'Quizzes & Leaderboard',
    description: 'Test your knowledge and compete with others',
    icon: Trophy,
    color: 'from-chart-3/80 to-chart-3',
    path: '/quizzes',
    stats: '500+ Questions'
  },
  {
    title: 'Cultural Map',
    description: 'Explore regional traditions, heroes, and heritage',
    icon: Map,
    color: 'from-chart-4/80 to-chart-4',
    path: '/map',
    stats: '28 States + 8 UTs'
  }
];

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, getSacredTitle } = useAuthStore();
  const navigate = useNavigate();
  const [showDonation, setShowDonation] = useState(false);

  useSEO({
    title: 'Home',
    description: 'Rediscover India\'s rich cultural heritage through an immersive, AI-powered spiritual journey.',
    keywords: 'indian culture, ancient wisdom, spiritual journey, ai hinduism, sanskruti ai, upanishads, bhagavad gita'
  });

  const dynamicLeaderboard = getDynamicLeaderboard(user, getSacredTitle());

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-badge",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(".hero-title",
        { y: 30, opacity: 0, rotationX: -20 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.3"
      )
      .fromTo(".hero-desc",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(".hero-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "elastic.out(1, 0.7)" },
        "-=0.4"
      )
      .fromTo(".hero-stats",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

    // Continuous floating animation for orbs
    gsap.to(".orb-float", {
      y: "random(-15, 15)",
      x: "random(-15, 15)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { amount: 1.5 }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-12 pb-12 relative">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl bg-theme-gradient p-8 md:p-12 shadow-[0_0_40px_hsl(var(--primary)/0.3)] border border-white/10"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-white perspective-[1000px]">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md px-4 py-2 uppercase tracking-widest text-xs font-semibold hero-badge shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Divine Wisdom Meets AI
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight cinzel-text drop-shadow-xl text-balance hero-title origin-bottom">
              Rediscover India's Rich Heritage
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light font-sans max-w-xl hero-desc">
              Explore sacred scriptures, vibrant festivals, ancient wisdom, and regional traditions through an immersive, AI-powered spiritual journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/scripture')}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-bold px-8 h-14 text-lg rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hero-btn transform-gpu transition-all hover:scale-105"
              >
                Begin Journey
              </Button>
              <Button 
                onClick={() => setShowDonation(true)}
                size="lg" 
                variant="outline" 
                className="text-white border-white/30 bg-white/5 hover:bg-white/20 hover:text-white backdrop-blur-md h-14 text-lg rounded-full px-8 hero-btn transform-gpu transition-all hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:border-orange-400/50 group"
              >
                <HeartHandshake className="w-5 h-5 mr-2 group-hover:text-orange-400 transition-colors" />
                Support Our Mission
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 hero-stats">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                <span className="text-sm font-medium">10,000+ Seekers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                <span className="text-sm font-medium">7 Divine Paths</span>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden md:block relative h-[520px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(251,191,36,0.3)] border border-amber-500/20 group transform-gpu"
          >
            {/* Divine Aura Glow behind the video */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-[2.5rem] blur-[80px] -z-10 group-hover:bg-amber-400/30 transition-colors duration-700"></div>
            
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 transform-gpu group-hover:scale-105"
            >
              <source src="/videos/om.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Premium Royal Overlay */}
            <div className="absolute inset-0 border-[3px] border-amber-500/10 rounded-[2.5rem] pointer-events-none group-hover:border-amber-400/30 transition-colors duration-700"></div>
            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none shadow-inner bg-gradient-to-tr from-amber-900/40 via-transparent to-amber-300/10 mix-blend-overlay"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-[2.5rem]"></div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="orb-float absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
        <div className="orb-float absolute bottom-0 left-0 w-96 h-96 bg-primary/40 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      </motion.section>

      {/* About Section (New) */}
      <section className="relative px-6 mt-16">
        <div className="absolute inset-0 bg-primary/5 rounded-3xl -z-10 blur-xl"></div>
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary">The Cosmic Blueprint</h2>
          <h3 className="text-3xl md:text-4xl font-bold cinzel-text text-foreground">A Bridge Between Eras</h3>
          <p className="text-muted-foreground leading-relaxed">
            Sanskruti AI is designed to preserve and illuminate the profound spiritual and cultural wealth of Bharat. By bridging ancient texts with modern artificial intelligence, we offer a portal to divine knowledge, making it accessible to seekers around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Authentic Texts", desc: "Verifiable knowledge rooted in original scriptures and ancient manuscripts.", icon: BookOpen },
            { title: "Immersive Experience", desc: "Beautifully crafted themes that transport you to a realm of spiritual calm.", icon: Sparkles },
            { title: "AI Wisdom", desc: "Context-aware artificial intelligence providing deep philosophical insights.", icon: Lightbulb }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-panel p-8 text-center space-y-4 hover:border-primary/50 transition-colors group">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground cinzel-text">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modules Grid */}
      <section className="px-6 mt-16">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-2">Sacred Pathways</h2>
            <h3 className="text-3xl md:text-4xl font-bold cinzel-text text-foreground">Explore Modules</h3>
            <p className="text-muted-foreground mt-2 max-w-xl">Choose from seven interactive portals to begin your cultural and spiritual journey</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.path}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.05, rotate: Math.random() * 4 - 2, zIndex: 50, cursor: "grabbing" }}
              className="cursor-grab relative"
            >
              <ModuleCard {...module} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="px-6 pb-12 mt-16">
        <Card className="p-8 glass-panel border-t-4 border-t-primary shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
            <div>
              <h3 className="text-3xl font-bold cinzel-text text-foreground mb-2">Hall of Seekers</h3>
              <p className="text-muted-foreground">Compete, learn, and earn sacred Sanskrit titles</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-theme-gradient flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            {dynamicLeaderboard.slice(0, 5).map((entry) => (
              <motion.div
                key={entry.rank}
                whileHover={{ scale: 1.01, x: 5 }}
                className="flex items-center gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:bg-card transition-all"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${entry.rank === 1 ? 'bg-theme-gradient-secondary text-white ring-4 ring-yellow-500/20' :
                  entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white' :
                      'bg-muted text-muted-foreground'
                  }`}>
                  {entry.rank === 1 ? <Star className="w-6 h-6" /> : entry.rank}
                </div>
                <div className="text-3xl">{entry.avatar}</div>
                <div className="flex-1">
                  <p className={`font-bold text-lg ${entry.name.includes('(You)') ? 'text-primary' : 'text-foreground'}`}>{entry.name}</p>
                  <p className="text-sm font-medium text-primary">{entry.title}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-xl text-foreground">{entry.score}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{entry.quizzesCompleted} quizzes</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center relative z-10">
            <Button onClick={() => navigate('/quizzes')} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-full px-8">
              View Full Leaderboard
            </Button>
          </div>
        </Card>
      </section>

      {/* IMAX Level Premium Donation Modal */}
      <AnimatePresence>
        {showDonation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Extremely dark cinematic backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setShowDonation(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(251,146,60,0.15)] flex flex-col md:flex-row z-10"
            >
              {/* Premium Glow Effects */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

              {/* Close Button */}
              <button 
                onClick={() => setShowDonation(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Content */}
              <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 relative z-10 flex flex-col justify-center">
                <Badge className="w-fit mb-6 bg-orange-500/10 text-orange-400 border-orange-500/20 uppercase tracking-widest text-xs font-bold px-3 py-1">
                  <ShieldCheck className="w-3 h-3 mr-2 inline" />
                  Preserve The Eternal Knowledge
                </Badge>
                
                <h2 className="text-3xl md:text-5xl font-bold cinzel-text text-white leading-tight mb-6">
                  Support the <br/><span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 text-transparent bg-clip-text">Dharmic Renaissance</span>
                </h2>
                
                <div className="space-y-4 text-slate-300 font-light leading-relaxed mb-8">
                  <p>
                    Sanskruti AI is a labor of profound devotion, built to preserve and freely distribute the immense spiritual wealth of Bharat to seekers worldwide.
                  </p>
                  <p>
                    We operate entirely without ads, relying strictly on the goodwill of those who share our vision. Your patronage empowers us to digitize ancient manuscripts, expand our AI's capabilities, and keep this sanctuary of knowledge accessible for future generations.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-slate-400 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-orange-400" />
                    100% Ad-Free
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    Driven by Devotion
                  </div>
                </div>
              </div>

              {/* Right Side: Payment/QR */}
              <div className="w-full md:w-[380px] p-8 md:p-12 bg-white/[0.02] flex flex-col justify-center items-center relative z-10">
                <div className="text-center w-full space-y-6">
                  <h3 className="text-white font-semibold tracking-wide text-lg">Become a Patron</h3>
                  
                  {/* Styled QR Container */}
                  <div className="relative w-48 h-48 mx-auto p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl group cursor-pointer overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Render a styled "dummy" QR code to look extremely premium. In production, place real QR image here */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=sanskruti-ai-patron&color=ffffff&bgcolor=000000`} 
                      alt="Donation QR Code" 
                      className="w-full h-full object-contain mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] filter brightness-150 contrast-125"
                    />
                    
                    {/* Center OM symbol overlay over QR */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                        <span className="text-orange-400 text-2xl font-bold font-sans drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]">ॐ</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-4">
                    Scan to contribute via UPI
                  </p>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#0a0a0a] px-3 text-slate-500 tracking-widest">or</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl h-12">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Card
                    </Button>
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl h-12">
                      <QrCode className="w-4 h-4 mr-2" />
                      Net Banking
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

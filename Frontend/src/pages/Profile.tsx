import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Settings, Award, BookOpen, Bookmark, Brain, Moon, Sun, Share2, Map, Trophy, Sparkles, ScrollText, Calendar, Flame, PlaySquare, Heart, Shield, Droplet, ShieldAlert, Database, Users, Server } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { toast } from 'sonner';

export default function Profile() {
    const { user, isGuest, logout, getSacredTitle, getEarnedBadges } = useAuthStore();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".profile-header",
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(".profile-card",
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
                "-=0.4"
            );
    }, { scope: containerRef });

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const handleShare = async (badgeName: string) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Spiritual Journey - Sanskruti AI',
                    text: `I just earned the "${badgeName}" badge on my eternal journey! 🕉️ Join me on Sanskruti AI.`,
                    url: window.location.origin,
                });
                toast.success("Journey shared successfully!");
            } catch (err) {
                console.log("Error sharing", err);
            }
        } else {
            toast.info("Sharing is not supported on this browser.");
        }
    };

    const sacredTitle = getSacredTitle();
    const earnedBadges = getEarnedBadges();

    const IconMap: Record<string, any> = {
        Sparkles, BookOpen, Award, Brain, Trophy, Map, Shield, Sun, Moon, Droplet, ShieldAlert
    };

    return (
        <div ref={containerRef} className="space-y-8 max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 profile-header bg-card/40 p-8 rounded-3xl border border-border/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="w-24 h-24 rounded-full bg-theme-gradient p-1 shadow-xl">
                        <div className="w-full h-full bg-card rounded-full flex items-center justify-center border-4 border-background">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User className="w-10 h-10 text-primary" />
                            )}
                        </div>
                    </div>

                    <div className="space-y-1 text-center md:text-left">
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                            <h1 className="text-3xl font-bold cinzel-text text-foreground">{user?.name}</h1>
                            {isGuest ? (
                                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">Guest</Badge>
                            ) : user?.role === 'admin' ? (
                                <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg px-3 py-1 font-bold uppercase tracking-widest">
                                    Supreme Platform Admin
                                </Badge>
                            ) : (
                                <Badge className={`bg-gradient-to-r ${sacredTitle.badgeColor} text-white border-0 shadow-lg px-3 py-1 font-semibold uppercase tracking-wider`}>
                                    {sacredTitle.title}
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">{user?.email || "Exploring anonymously"}</p>
                    </div>          </div>
            </div>

            <Button
                variant="outline"
                onClick={handleLogout}
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive w-full md:w-auto relative z-10"
            >
                <LogOut className="w-4 h-4 mr-2" />
                {isGuest ? 'Leave Session' : 'Sign Out'}
            </Button>

            {/* Grid Content */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Column: Stats & Progress */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold cinzel-text text-foreground profile-card px-2">Your Journey</h2>

                    {user?.role === 'admin' ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Card className="p-4 glass-panel border-purple-500/20 relative overflow-hidden hover:border-purple-500/50 transition-all cursor-default group bg-purple-950/5">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <ShieldAlert className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">Supreme Panel</h3>
                                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Access Granted</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 glass-panel border-emerald-500/20 relative overflow-hidden hover:border-emerald-500/50 transition-all cursor-default group bg-emerald-950/5">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Database className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">Data Cluster</h3>
                                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Systems Online</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 glass-panel border-amber-500/20 relative overflow-hidden hover:border-amber-500/50 transition-all cursor-default group bg-amber-950/5">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                        <Users className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">User Entities</h3>
                                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Global Governance</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-4 glass-panel border-cyan-500/20 relative overflow-hidden hover:border-cyan-500/50 transition-all cursor-default group bg-cyan-950/5">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                        <Server className="w-6 h-6 text-cyan-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">Server Health</h3>
                                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">99.9% Uptime Metrics</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card className="p-4 glass-panel border-primary/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                            <BookOpen className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.exploredModules?.scripture || user?.shlokasRead || 0}</h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Shlokas Learned</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-amber-500/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                            <ScrollText className="w-6 h-6 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.exploredModules?.stories || user?.storiesCompleted || 0}</h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Stories Finished</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-pink-500/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 group-hover:scale-110 transition-transform">
                                            <Calendar className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.exploredModules?.festivals || 0}</h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Festivals Explored</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-green-500/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                                            <Trophy className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.exploredModules?.quizzes || user?.quizzesCompleted || 0}</h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Quiz Score</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-violet-500/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                                            <PlaySquare className="w-6 h-6 text-violet-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.reelsWatched || 0}</h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Reels Watched</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-sky-500/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
                                            <Bookmark className="w-6 h-6 text-sky-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.reelsSaved?.length || 0}</h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Wisdom Saved</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-secondary/20 relative overflow-hidden group bg-secondary/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-110 transition-transform">
                                                <Award className="w-6 h-6 text-secondary" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-foreground">{user?.points || 0} <span className="text-xs text-muted-foreground font-normal">KP</span></h3>
                                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Karma Points</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-secondary border-secondary/30 hidden sm:flex">Lvl {sacredTitle.currentLevel}</Badge>
                                    </div>
                                </Card>

                                <Card className="p-4 glass-panel border-orange-500/20 relative overflow-hidden group">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                                            <Flame className="w-6 h-6 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground">{user?.streak || 0} <span className="text-xs text-muted-foreground font-normal">Days</span></h3>
                                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Current Streak</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Swiper Badges / Recent Activity */}
                            <Card className="p-0 glass-panel border-border/50 profile-card overflow-hidden">
                                <div className="p-6 border-b border-border/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Brain className="w-5 h-5 text-accent" />
                                        <h3 className="text-xl font-bold cinzel-text text-foreground">Relics & Badges</h3>
                                    </div>
                                    <Badge variant="outline" className="text-muted-foreground">{earnedBadges.length} Earned</Badge>
                                </div>

                                {isGuest ? (
                                    <div className="text-center py-10 space-y-3 px-6">
                                        <div className="inline-flex w-16 h-16 rounded-full bg-muted flex-items-center justify-center mb-2">
                                            <Bookmark className="w-8 h-8 text-muted-foreground/50 m-auto" />
                                        </div>
                                        <p className="text-muted-foreground">Sign up to track your learning journey and earn sacred badges.</p>
                                        <Button onClick={handleLogout} variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 mt-2">Create Account</Button>
                                    </div>
                                ) : (
                                    <div className="py-8 bg-black/10">
                                        <Swiper
                                            effect={'coverflow'}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            slidesPerView={'auto'}
                                            coverflowEffect={{
                                                rotate: 50,
                                                stretch: 0,
                                                depth: 100,
                                                modifier: 1,
                                                slideShadows: false,
                                            }}
                                            pagination={{ clickable: true }}
                                            modules={[EffectCoverflow, Pagination]}
                                            className="w-full pb-12 px-4"
                                        >
                                            {earnedBadges.map((badge) => {
                                                const IconComponent = IconMap[badge.icon] || Sparkles;
                                                return (
                                                    <SwiperSlide key={badge.id} style={{ width: '260px' }} className="max-w-[70vw]">
                                                        <Card className={`p-6 border border-white/20 relative overflow-hidden h-[340px] flex flex-col items-center justify-center text-center bg-gradient-to-br ${badge.color} text-white shadow-2xl group`}>
                                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                                            <div className="relative z-10 space-y-4 w-full">
                                                                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 rotate-12 group-hover:rotate-0">
                                                                    <IconComponent className="w-10 h-10 text-white drop-shadow-md" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-2xl font-bold cinzel-text drop-shadow-sm">{badge.name}</h4>
                                                                    <p className="text-white/80 text-sm mt-2 px-2">{badge.description}</p>
                                                                </div>
                                                                <div className="pt-4 border-t border-white/20 w-full flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                                                    <span className="text-xs font-medium uppercase tracking-wider">{badge.date}</span>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="h-8 w-8 p-0 rounded-full hover:bg-white/20"
                                                                        onClick={() => handleShare(badge.name)}
                                                                    >
                                                                        <Share2 className="w-4 h-4 text-white" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                )}
                            </Card>
                        </>
                    )}                </div>

                {/* Right Column: Settings */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold cinzel-text text-foreground profile-card px-2">Settings</h2>

                    <Card className="p-6 glass-panel border-border/50 space-y-6 profile-card">
                        <div className="flex items-center gap-2 pb-4 border-b border-border/50">
                            <Settings className="w-5 h-5 text-muted-foreground" />
                            <h3 className="font-semibold text-foreground">Preferences</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Display Theme</p>
                                    <p className="text-xs text-muted-foreground">Adjust your visual experience</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="rounded-full"
                                >
                                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Audio Language</p>
                                    <p className="text-xs text-muted-foreground">For voice explanations</p>
                                </div>
                                <Badge variant="secondary">English</Badge>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div >
    );
}

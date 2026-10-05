import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, ArrowRight, UserCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Auth() {
    const navigate = useNavigate();
    const { login, setGuestMode } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power3.inOut" }
        )
            .fromTo(".auth-title",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
                "-=0.5"
            )
            .fromTo(formRef.current,
                { scale: 0.95, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(".floating-orb",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, stagger: 0.3, ease: "elastic.out(1, 0.5)" },
                "-=0.8"
            );

        // Continuous floating animation
        gsap.to(".floating-orb", {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 2,
                from: "random"
            }
        });
    }, { scope: containerRef });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                login(data);
                toast.success(`Welcome back, ${data.name}!`);
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("Failed to connect to the portal.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                login(data);
                toast.success(`Welcome to the Journey, ${data.name}!`);
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            toast.error("Failed to connect to the portal.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestEntry = () => {
        setIsLoading(true);
        // Add a slight delay for animation feel
        setTimeout(() => {
            setGuestMode();
            toast.success("Entered as Guest");
            navigate('/');
        }, 800);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="floating-orb absolute top-[10%] left-[15%] w-64 h-64 bg-primary/20 rounded-full blur-3xl mix-blend-screen" />
                <div className="floating-orb absolute bottom-[15%] right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-screen" />
                <div className="floating-orb absolute top-[40%] right-[30%] w-48 h-48 bg-accent/20 rounded-full blur-3xl mix-blend-screen" />
            </div>

            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Side: Branding & Welcome */}
                <div className="text-center lg:text-left space-y-6">
                    <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-theme-gradient rounded-full mb-4 mx-auto lg:mx-0 shadow-lg shadow-primary/30 auth-title">
                        <span className="text-primary-foreground font-bold text-3xl sm:text-4xl">स</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold cinzel-text text-foreground leading-tight auth-title drop-shadow-sm">
                        Awaken Your <br />
                        <span className="gradient-text drop-shadow-none">Cultural Journey</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 auth-title leading-relaxed">
                        Enter the divine portal of Sanskruti AI. Rediscover ancient wisdom, festivals, and scriptures through the lens of modern intelligence.
                    </p>
                </div>

                {/* Right Side: Auth Forms */}
                <div ref={formRef} className="w-full max-w-md mx-auto lg:mx-0 relative">
                    {/* Decorative Border Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-20" />

                    <Card className="glass-panel p-6 sm:p-8 relative w-full border border-border/50">
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6 bg-card/50 border border-border/50 p-1 rounded-xl">
                                <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                    Login
                                </TabsTrigger>
                                <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                    Sign Up
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="login" className="space-y-4">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Email</label>
                                        <Input type="email" placeholder="seeker@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-card/40 border-border/50 focus:border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-foreground">Password</label>
                                            <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                                        </div>
                                        <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-card/40 border-border/50 focus:border-primary/50" />
                                    </div>
                                    <Button type="submit" className="w-full bg-theme-gradient hover:opacity-90 text-white shadow-lg" disabled={isLoading}>
                                        {isLoading ? "Authenticating..." : "Enter Portal"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="signup" className="space-y-4">
                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Full Name</label>
                                        <Input type="text" placeholder="Deva" value={name} onChange={(e) => setName(e.target.value)} required className="bg-card/40 border-border/50 focus:border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Email</label>
                                        <Input type="email" placeholder="seeker@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-card/40 border-border/50 focus:border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Password</label>
                                        <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-card/40 border-border/50 focus:border-primary/50" />
                                    </div>
                                    <Button type="submit" className="w-full bg-theme-gradient hover:opacity-90 text-white shadow-lg" disabled={isLoading}>
                                        {isLoading ? "Creating Account..." : "Begin Journey"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground font-semibold tracking-wider">Or</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary transition-all group h-12 relative overflow-hidden"
                            onClick={handleGuestEntry}
                            disabled={isLoading}
                        >
                            <div className="absolute inset-0 bg-primary/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10 flex items-center justify-center w-full">
                                <UserCircle2 className="w-5 h-5 mr-2" />
                                <span className="font-semibold text-base leading-none pt-0.5">Continue as Guest</span>
                                <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                            </span>
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

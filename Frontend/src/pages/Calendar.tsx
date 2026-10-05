// @ts-nocheck
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, Flame, Star, Clock, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { festivalDataMap, getMarathiMonthFromGregorian, generateCalendarGrid } from '@/lib/calendarData';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    useSEO({
        title: 'Dharmic Calendar',
        description: 'Premium Hindu Panchang and Dharmic Calendar. Track festivals, tithis, vrats, and auspicious timings across the year.',
        keywords: 'hindu calendar, panchang, indian festivals, tithi calendar, vrats, dharmic calendar'
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = new Date();
    const isToday = (date: Date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    // Calculate calendar grid
    const days = useMemo(() => generateCalendarGrid(year, month), [year, month]);

    // Festivals for current month
    const currentMonthFestivals = useMemo(() => {
        return Object.values(festivalDataMap).flat().filter((f: any) => {
            if (!f || !f.date) return false;
            const matchMonth = parseInt(f.date.split('-')[1], 10) - 1;
            const matchYear = parseInt(f.date.split('-')[0], 10);
            return matchMonth === month && matchYear === year;
        });
    }, [year, month]);

    // Find festivals for a given date
    const getFestivalsForDate = (date: Date) => {
        const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return festivalDataMap[fullDate] || [];
    };

    // Marathi month for displaying
    const currentMarathiMonth = getMarathiMonthFromGregorian(new Date(year, month));

    return (
        <div className="flex flex-col xl:flex-row gap-6 h-[calc(100dvh-6rem)] w-full overflow-hidden">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            
            {/* Left Sidebar: Today & Highlights */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="xl:w-[380px] flex-shrink-0 h-full flex flex-col"
            >
                <Card className="glass-panel border-amber-500/30 overflow-hidden relative group flex-1 shadow-[0_0_50px_rgba(255,180,51,0.15)] rounded-3xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 z-0 transition-transform duration-[20s] group-hover:scale-110"
                        style={{ backgroundImage: 'url("/calendar_bg.png")' }}
                    />
                    {/* Strong gradient overlay to guarantee text legibility on top of the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-0"></div>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0"></div>

                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none z-0"></div>

                    <div className="relative z-10 p-8 h-full flex flex-col overflow-y-auto no-scrollbar">
                        {/* Header Toggle */}
                        <div className="flex items-center gap-2 mb-auto">
                            <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-1.5 shadow-[0_0_15px_rgba(255,180,51,0.2)]">
                                <CalendarIcon className="w-4 h-4 mr-2" /> Premium Calendar
                            </Badge>
                        </div>

                        {/* Big Date Display */}
                        <div className="space-y-1 mt-8 mb-6">
                            <h1 className="text-8xl xl:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter drop-shadow-lg">
                                {today.getDate()}
                            </h1>
                            <h2 className="text-3xl font-bold cinzel-text text-amber-500 drop-shadow-md">
                                {MONTHS[today.getMonth()]} {today.getFullYear()}
                            </h2>
                        </div>

                        {/* Marathi Details */}
                        <div className="p-5 bg-black/40 backdrop-blur-xl rounded-2xl border-l-4 border-amber-500 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1.5 relative z-10">Hindu Panchang</p>
                            <p className="text-xl font-bold text-white relative z-10">{getMarathiMonthFromGregorian(today)}</p>
                            <div className="flex items-center gap-2 mt-3 relative z-10">
                                <Badge variant="outline" className="border-amber-500/30 text-amber-200 bg-amber-500/10">Shukla Paksha</Badge>
                                <Badge variant="outline" className="border-orange-500/30 text-orange-200 bg-orange-500/10">Pratipada</Badge>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-6"></div>

                        {/* Upcoming Highlights */}
                        <div className="space-y-4">
                            <h3 className="font-bold cinzel-text text-xl text-white flex items-center gap-2">
                                <Star className="w-5 h-5 text-secondary" /> Upcoming in {MONTHS[month]}
                            </h3>

                            <div className="space-y-3">
                                {currentMonthFestivals.slice(0, 3).map((fest, idx) => (
                                    <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors">
                                            <span className="text-xs font-bold text-primary/80 uppercase">{MONTHS[month].substring(0, 3)}</span>
                                            <span className="text-lg font-black text-primary">{fest.date.split('-')[2]}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white group-hover:text-primary transition-colors">{fest.title}</p>
                                            <p className="text-xs text-white/50">{fest.marathiTithi}</p>
                                        </div>
                                    </div>
                                ))}
                                {currentMonthFestivals.length === 0 && (
                                    <p className="text-sm text-white/60 text-center py-4">No major festivals this month.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Main Calendar Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 min-w-0"
            >
                <Card className="p-6 xl:p-8 bg-black/60 border border-white/5 h-full flex flex-col shadow-2xl backdrop-blur-3xl rounded-3xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40"></div>
                    
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                        <div>
                            <h2 className="text-4xl xl:text-5xl font-bold cinzel-text text-white flex items-center gap-4 drop-shadow-sm">
                                {MONTHS[month]} <span className="text-white/40">{year}</span>
                                <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/30 shadow-sm ml-2 hidden sm:inline-flex">
                                    {currentMarathiMonth} Maas
                                </Badge>
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-md p-1 rounded-full border border-border/50">
                            <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="rounded-full hover:bg-primary/20 hover:text-primary">
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" onClick={() => setCurrentDate(new Date())} className="font-bold text-muted-foreground hover:text-foreground">
                                Today
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleNextMonth} className="rounded-full hover:bg-primary/20 hover:text-primary">
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Days of Week Header */}
                    <div className="grid grid-cols-7 gap-2 xl:gap-4 mb-2 shrink-0 relative z-10">
                        {DAYS_OF_WEEK.map((day, i) => (
                            <div key={day} className={`text-center font-bold text-[10px] xl:text-xs tracking-[0.2em] uppercase pb-3 border-b border-border/20 ${i === 0 ? 'text-amber-500' : 'text-white/40'}`}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days - Fluid sizing eliminates scrollbars */}
                    <div className={`grid grid-cols-7 ${days.length > 35 ? 'grid-rows-6' : 'grid-rows-5'} gap-1.5 xl:gap-2.5 flex-1 min-h-0 relative z-10 py-1`}>
                        <AnimatePresence mode="popLayout">
                            {days.map((dayObj, index) => {
                                const fests = getFestivalsForDate(dayObj.date);
                                const todayMark = isToday(dayObj.date);
                                const isDense = days.length > 35;

                                return (
                                    <motion.div
                                        key={`${year}-${month}-${index}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.005 }}
                                        title={fests.length > 0 ? fests.map((f: any) => f.title).join(', ') : undefined}
                                        onClick={() => {
                                            if (fests.length > 0) {
                                                navigate(`/festivals?search=${encodeURIComponent(fests[0].title)}`);
                                            }
                                        }}
                                        className={`
                                            relative ${isDense ? 'p-1.5' : 'p-2 xl:p-2.5'} rounded-2xl flex flex-col items-start min-h-0 transition-all duration-300 group cursor-pointer overflow-hidden
                                            ${!dayObj.isCurrentMonth 
                                                ? 'bg-black/50 border border-white/5 pointer-events-none shadow-inner opacity-50' 
                                                : 'hover:scale-[1.03] hover:z-20 ' + (todayMark 
                                                    ? 'bg-amber-500/10 border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20' 
                                                    : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10')}
                                            ${fests.length > 0 ? 'festival-highlight' : ''}
                                        `}
                                    >
                                        {!dayObj.isCurrentMonth ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Sparkles className="w-3 h-3 text-amber-500/20" />
                                            </div>
                                        ) : (
                                            <>
                                                {/* Date Number */}
                                                <div className={`${isDense ? 'text-sm xl:text-base w-5 h-5 xl:w-6 xl:h-6' : 'text-lg xl:text-xl w-6 h-6 xl:w-8 xl:h-8'} font-bold rounded-full flex items-center justify-center mb-0.5 transition-colors shrink-0
                                                    ${todayMark ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg' : 'text-white/70 group-hover:text-amber-400'}
                                                `}>
                                                    {dayObj.dayNumber}
                                                </div>

                                                {/* Festival Marker */}
                                                {fests.length > 0 && (
                                                    <div className="w-full flex-1 min-h-0 overflow-y-auto no-scrollbar pointer-events-auto mt-0.5">
                                                        <div className="flex flex-col gap-0.5 w-full pb-0.5">
                                                            {fests.map((fest: any, i: number) => (
                                                                <div key={i} className={`
                                                                    px-1.5 py-0.5 rounded-md text-[7px] xl:text-[8px] font-bold leading-tight w-full backdrop-blur-sm shrink-0
                                                                    ${fest.type === 'festival' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                                                                fest.type === 'vrat' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                                                                                    'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}
                                                                `}>
                                                                    <div className="flex items-center gap-1 mb-0.5">
                                                                        {fest.type === 'vrat' && <Flame className="w-2.5 h-2.5 flex-shrink-0" />}
                                                                        {fest.type === 'festival' && <Star className="w-2.5 h-2.5 flex-shrink-0" />}
                                                                        <span className="truncate">{fest.title}</span>
                                                                    </div>
                                                                    <p className="text-[6.5px] xl:text-[7.5px] opacity-70 truncate font-medium">{fest.marathiTithi}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {fests.length === 0 && dayObj.dayNumber % 5 === 0 && (
                                                    <div className="opacity-0 group-hover:opacity-100 mt-auto text-[7px] xl:text-[8px] text-white/30 w-full text-right transition-opacity shrink-0">
                                                        No events
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

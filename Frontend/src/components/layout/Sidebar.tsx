import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Heart,
  Lightbulb,
  Mic,
  Trophy,
  Map,
  Home,
  Sparkles,
  ScrollText,
  PlaySquare,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { path: '/', icon: Home, label: 'Dashboard', color: 'text-orange-600' },
  { path: '/scripture', icon: BookOpen, label: 'Scripture Explainer', color: 'text-purple-600' },
  { path: '/festivals', icon: Calendar, label: 'Festival Intelligence', color: 'text-pink-600' },
  { path: '/recommender', icon: Heart, label: 'Cultural Recommender', color: 'text-red-600' },
  { path: '/knowledge', icon: Lightbulb, label: 'Knowledge Capsules', color: 'text-yellow-600' },
  { path: '/voice-qa', icon: Mic, label: 'Voice Q&A', color: 'text-blue-600' },
  { path: '/quizzes', icon: Trophy, label: 'Quizzes & Leaderboard', color: 'text-green-600' },
  { path: '/map', icon: Map, label: 'Cultural Map', color: 'text-indigo-600' },
  { path: '/storyverse', icon: ScrollText, label: 'Vedic Storyverse', color: 'text-amber-600' },
  { path: '/reels', icon: PlaySquare, label: 'Cultural Reels', color: 'text-violet-500' },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card/80 backdrop-blur-md border-r border-border shadow-lg z-40 overflow-y-auto"
    >
      <div className="p-4 space-y-2">
        <div className="mb-6 px-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Explore Modules</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Discover India's rich cultural heritage
          </p>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-primary/15 text-primary shadow-sm'
                  : 'hover:bg-primary/10 text-foreground/80'
              )}
            >
              <Icon className={cn('w-5 h-5 transition-colors', isActive ? item.color : 'text-muted-foreground group-hover:text-primary')} />
              <span className={cn('text-sm font-medium', isActive ? 'text-primary font-semibold' : '')}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="ml-auto w-1 h-6 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
                />
              )}
            </Link>
          );
        })}

        {user?.role === 'admin' && (
          <Link
            to="/admin"
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group mt-4 border border-amber-500/30',
              location.pathname === '/admin'
                ? 'bg-amber-950/40 text-amber-500 shadow-sm'
                : 'bg-amber-950/10 hover:bg-amber-950/30 text-amber-400/80'
            )}
          >
            <ShieldAlert className="w-5 h-5 transition-colors" />
            <span className="text-sm font-medium">Royal Governance</span>
          </Link>
        )}
      </div>

      <div className="p-4 mt-6 mx-4 bg-primary/5 rounded-lg border border-primary/20 shadow-inner">
        <p className="text-xs text-foreground font-semibold mb-2 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-primary" />
          Pro Tip:
        </p>
        <p className="text-xs text-muted-foreground">
          Use voice commands in Voice Q&A for hands-free learning!
        </p>
      </div>
    </motion.aside>
  );
}

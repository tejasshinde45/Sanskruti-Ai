import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
  stats?: string;
}

export default function ModuleCard({ title, description, icon: Icon, color, path, stats }: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={path}>
        <Card className="p-6 h-full glass-panel hover:shadow-2xl transition-all duration-300 hover:border-primary/50 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10 space-y-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-7 h-7 text-white" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold cinzel-text text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {stats && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground/80">{stats}</p>
              </div>
            )}

            <Button
              variant="ghost"
              className="w-full justify-between group-hover:bg-primary/20 group-hover:text-primary transition-colors text-foreground"
            >
              Explore Module
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

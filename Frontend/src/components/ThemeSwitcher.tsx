import { useState, useEffect } from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const THEMES = [
    { id: 'royal', name: 'Royal Hindu', icon: Sun },
    { id: 'ocean', name: 'Ocean Dark', icon: Moon },
    { id: 'cosmic', name: 'Cosmic Ocean', icon: Sparkles },
] as const;

export type ThemeId = typeof THEMES[number]['id'];

export function ThemeSwitcher() {
    const [theme, setTheme] = useState<ThemeId>('royal');

    useEffect(() => {
        // Read from local storage
        const saved = localStorage.getItem('theme') as ThemeId;
        if (saved && THEMES.find(t => t.id === saved)) {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved === 'royal' ? '' : saved);
        }
    }, []);

    const handleThemeChange = (newTheme: ThemeId) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'royal') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    };

    const CurrentIcon = THEMES.find(t => t.id === theme)?.icon || Sun;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10 rounded-full border-primary/20 bg-background/50 backdrop-blur-md">
                    <CurrentIcon className="w-5 h-5 text-primary" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card backdrop-blur-xl border-border/50">
                {THEMES.map((t) => (
                    <DropdownMenuItem
                        key={t.id}
                        onClick={() => handleThemeChange(t.id)}
                        className={`cursor-pointer ${theme === t.id ? 'bg-primary/10 text-primary' : ''}`}
                    >
                        <t.icon className="w-4 h-4 mr-2" />
                        {t.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

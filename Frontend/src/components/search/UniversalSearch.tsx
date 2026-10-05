import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';
import { deityProfiles } from '../../data/deityData/profiles';
import { DeityProfile } from '../../types/familyTree';

const UniversalSearch = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DeityProfile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse index once
  const fuse = new Fuse(Object.values(deityProfiles), {
    keys: ['name', 'sanskritName', 'aliases', 'role', 'realm'],
    threshold: 0.3, // Fuzzy matching threshold
  });

  // Handle CMD+K / CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim() === '') {
      setResults([]);
      return;
    }
    const r = fuse.search(q).map(res => res.item);
    setResults(r.slice(0, 5)); // Limit to 5 results
  };

  const selectResult = (id: string) => {
    setIsOpen(false);
    onNavigate(id); // Triggers camera fly-to
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="absolute top-8 left-28 z-20 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-[#050a15]/80 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-amber-400 transition-colors group"
        >
          <Search className="w-4 h-4 text-amber-500" />
          <span className="text-amber-100/70 text-xs font-medium tracking-widest uppercase group-hover:text-amber-100 transition-colors">
            Search Cosmos
          </span>
          <div className="flex items-center gap-1 text-[10px] text-amber-500/50 bg-amber-500/10 px-2 py-0.5 rounded ml-2">
            <Command className="w-3 h-3" /> K
          </div>
        </button>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#050a15]/95 border border-amber-500/40 rounded-2xl shadow-[0_0_80px_rgba(245,158,11,0.1)] overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-amber-500/20">
                <Search className="w-5 h-5 text-amber-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search deities, realms, aliases..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-amber-50 text-lg placeholder:text-amber-100/30 cinzel-text"
                />
                <button onClick={() => setIsOpen(false)} className="text-amber-500/50 hover:text-amber-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.length > 0 ? (
                  results.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => selectResult(res.id)}
                      className="flex flex-col gap-1 p-4 rounded-xl hover:bg-amber-900/20 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-amber-100 font-bold tracking-widest uppercase cinzel-text group-hover:text-amber-400 transition-colors">
                          {res.name}
                        </span>
                        {res.role && (
                          <span className="text-[10px] text-cyan-400 border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 rounded">
                            {res.role}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{res.aliases?.join(', ')}</span>
                    </div>
                  ))
                ) : query.length > 0 ? (
                  <div className="p-8 text-center text-amber-100/50 text-sm tracking-widest uppercase">
                    No entities found in this realm.
                  </div>
                ) : (
                  <div className="p-8 text-center text-amber-100/30 text-xs tracking-widest uppercase flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 opacity-50" />
                    Seek the divine by name or alias
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UniversalSearch;

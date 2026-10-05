import { motion, AnimatePresence } from 'framer-motion';
import { X, Sword, Wind, Star, Users, BookOpen, Sparkles } from 'lucide-react';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';
import { deityProfiles } from '../../data/deityData/profiles';

const CharacterProfileDrawer = () => {
  const selectedNodeId = useFamilyTreeStore((state) => state.selectedNodeId);
  const selectNode = useFamilyTreeStore((state) => state.selectNode);
  const experienceMode = useFamilyTreeStore((state) => state.experienceMode);
  const activeUniverse = useFamilyTreeStore((state) => state.activeUniverse);
  const loadUniverse = useFamilyTreeStore((state) => state.loadUniverse);

  const nodes = useFamilyTreeStore((state) => state.nodes);

  // Find profile from deityProfiles or fallback to node data
  const basicNodeData = selectedNodeId ? nodes.find(n => n.id === selectedNodeId)?.data : null;
  const detailedProfile = selectedNodeId ? deityProfiles[selectedNodeId] : null;

  const profile = selectedNodeId && basicNodeData ? {
    id: selectedNodeId,
    name: detailedProfile?.name || basicNodeData.label,
    sanskritName: detailedProfile?.sanskritName || '',
    title: basicNodeData.title || '',
    description: detailedProfile?.fullLore || basicNodeData.description || '',
    category: basicNodeData.description || '', // Usually stored category here
    dynasty: detailedProfile?.dynasty || '',
    loka: basicNodeData.realm || '',
    importanceLevel: basicNodeData.importance || 'major',
    weapons: detailedProfile?.weapon ? [detailedProfile.weapon] : [],
    mounts: detailedProfile?.vahana ? [detailedProfile.vahana] : [],
    parents: detailedProfile?.parents || [],
    spouses: detailedProfile?.consorts || [],
    children: detailedProfile?.children || [],
    scripturalReferences: detailedProfile?.associatedTexts || [],
    subtreeKey: ''
  } : null;

  // Drawer is only open when we have a profile and we're in PROFILE mode
  const isOpen = !!(selectedNodeId && experienceMode === 'PROFILE' && profile);

  return (
    <AnimatePresence>
      {isOpen && profile && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 250 }}
          className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] lg:w-[500px] bg-[#050a15]/95 backdrop-blur-2xl border-l border-amber-500/20 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-50 flex flex-col pointer-events-auto"
        >
          {/* Ambient Header Glow */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />

          {/* Close */}
          <div className="flex justify-end p-6 relative z-10">
            <button
              onClick={() => selectNode(null)}
              className="p-2.5 bg-black/40 hover:bg-amber-900/40 border border-amber-500/30 rounded-full text-amber-100 transition-colors group"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-10 pb-10 pt-2 relative z-10" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(245,158,11,0.2) transparent' }}>

            {/* Portrait Placeholder */}
            <div className="w-full aspect-[4/3] rounded-xl border border-amber-500/30 bg-gradient-to-br from-indigo-950 to-[#030712] relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.1)] flex items-center justify-center mb-8">
              <Star className="w-24 h-24 text-amber-500/20" />
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay" />
            </div>

            {/* Title */}
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-amber-100 uppercase tracking-widest drop-shadow-lg mb-1">
                {profile.name}
              </h2>
              {profile.sanskritName && (
                <p className="text-amber-500/80 text-xl font-serif tracking-widest">{profile.sanskritName}</p>
              )}
              <p className="text-amber-100/40 text-xs uppercase tracking-widest mt-2">{profile.title}</p>
            </div>

            {/* Tags: Category & Dynasty */}
            <div className="flex flex-wrap gap-2 mb-8">
              {profile.category && (
                <span className="px-3 py-1.5 border border-cyan-500/30 bg-cyan-950/40 text-cyan-200 text-xs font-bold uppercase tracking-wider rounded-sm">
                  {profile.category}
                </span>
              )}
              {profile.dynasty && (
                <span className="px-3 py-1.5 border border-amber-500/30 bg-amber-950/40 text-amber-200 text-xs font-bold uppercase tracking-wider rounded-sm">
                  {profile.dynasty}
                </span>
              )}
              {profile.loka && (
                <span className="px-3 py-1.5 border border-indigo-500/30 bg-indigo-950/40 text-indigo-200 text-xs font-bold uppercase tracking-wider rounded-sm">
                  {profile.loka}
                </span>
              )}
            </div>

            {/* Universe Portal */}
            {profile.subtreeKey && profile.subtreeKey !== activeUniverse && (
              <div className="mb-8">
                <button
                  onClick={() => loadUniverse(profile.subtreeKey)}
                  className="w-full relative overflow-hidden group flex items-center justify-center gap-3 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 px-6 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold uppercase tracking-widest text-sm">Enter {profile.name}'s Universe</span>
                </button>
              </div>
            )}

            {/* Lore */}
            <p className="text-slate-300 text-base leading-relaxed tracking-wide mb-10">
              {profile.description}
            </p>

            {/* Importance Badge */}
            <div className="mb-8 flex items-center gap-3 p-4 bg-amber-900/20 border border-amber-500/20 rounded-xl">
              <Star className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">Cosmic Importance</p>
                <p className="text-amber-100 text-sm font-bold tracking-widest uppercase">{profile.importanceLevel}</p>
              </div>
            </div>

            {/* Weapons & Mounts Grid */}
            {(profile.weapons?.length > 0 || profile.mounts?.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {profile.weapons?.length > 0 && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                    <Sword className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Weapons</p>
                      <p className="text-amber-100 text-sm font-bold">{profile.weapons.join(', ')}</p>
                    </div>
                  </div>
                )}
                {profile.mounts?.length > 0 && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                    <Wind className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Vahana</p>
                      <p className="text-cyan-100 text-sm font-bold">{profile.mounts.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Family Relations */}
            {(profile.parents?.length > 0 || profile.spouses?.length > 0 || profile.children?.length > 0) && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-amber-500" />
                  <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Divine Relations</p>
                </div>
                <div className="space-y-2">
                  {profile.parents?.length > 0 && (
                    <div className="flex gap-2 items-start text-xs">
                      <span className="text-slate-400 uppercase tracking-widest shrink-0">Parents</span>
                      <span className="text-amber-100">{profile.parents.join(', ')}</span>
                    </div>
                  )}
                  {profile.spouses?.length > 0 && (
                    <div className="flex gap-2 items-start text-xs">
                      <span className="text-slate-400 uppercase tracking-widest shrink-0">Consorts</span>
                      <span className="text-amber-100">{profile.spouses.join(', ')}</span>
                    </div>
                  )}
                  {profile.children?.length > 0 && (
                    <div className="flex gap-2 items-start text-xs">
                      <span className="text-slate-400 uppercase tracking-widest shrink-0">Children</span>
                      <span className="text-amber-100">{profile.children.slice(0, 5).join(', ')}{profile.children.length > 5 ? ` +${profile.children.length - 5} more` : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Scriptural References */}
            {profile.scripturalReferences?.length > 0 && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-fuchsia-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Scriptural Sources</p>
                  <p className="text-fuchsia-100 text-sm">{profile.scripturalReferences.join(' · ')}</p>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CharacterProfileDrawer;

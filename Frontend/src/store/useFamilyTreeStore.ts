import { create } from 'zustand';
import { CosmicNode, CosmicEdge } from '../types/familyTree';
import { buildUniverseGraph } from '../utils/graphBuilder';

export type ViewMode = 'tree' | 'timeline' | 'lokaMap';
export type ExperienceMode = 'EXPLORE' | 'STORY' | 'PROFILE' | 'SEARCH';

interface FamilyTreeState {
  // Core
  nodes: CosmicNode[];
  edges: CosmicEdge[];
  
  // Navigation & Interaction
  experienceMode: ExperienceMode;
  activeViewMode: ViewMode;
  activeUniverse: string;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  expandedNodes: Set<string>;
  
  // Phase 3 Systems
  activeFilters: string[];
  relationshipStartNode: string | null;
  relationshipEndNode: string | null;
  relationshipPath: string[]; // IDs of nodes in the path
  storyIndex: number;
  
  // Actions
  setExperienceMode: (mode: ExperienceMode) => void;
  setViewMode: (mode: ViewMode) => void;
  loadUniverse: (universeKey: string) => void;
  selectNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
  toggleExpandNode: (id: string) => void;
  initializeLayout: () => void;
  
  // Phase 3 Actions
  setFilters: (filters: string[]) => void;
  setRelationshipStart: (id: string | null) => void;
  setRelationshipEnd: (id: string | null) => void;
  setStoryIndex: (index: number) => void;
}

// Advanced Highlight Computation (Phase 2 & 3)
const computeHighlightState = (
  nodes: CosmicNode[], 
  edges: CosmicEdge[], 
  hoveredId: string | null, 
  selectedId: string | null,
  relationshipPath: string[],
  activeFilters: string[]
): CosmicNode[] => {
  
  // 1. Relationship Priority
  if (relationshipPath.length > 0) {
    const pathSet = new Set(relationshipPath);
    return nodes.map(n => ({
      ...n,
      data: {
        ...n.data,
        isHighlighted: pathSet.has(n.id),
        isFaded: !pathSet.has(n.id)
      }
    }));
  }

  // 2. Filter Priority
  if (activeFilters.length > 0) {
    return nodes.map(n => {
      // In a real app, this checks n.data.realm or n.data.role against activeFilters
      // For now, assuming naive match:
      const matchesFilter = activeFilters.some(f => 
        n.data.realm?.includes(f) || n.data.title?.includes(f) || n.data.role?.includes(f)
      );
      return {
        ...n,
        data: {
          ...n.data,
          isHighlighted: matchesFilter,
          isFaded: !matchesFilter
        }
      };
    });
  }

  // 3. Hover/Selection
  const activeId = hoveredId || selectedId;
  if (!activeId) {
    return nodes.map(n => ({ ...n, data: { ...n.data, isHighlighted: false, isFaded: false } }));
  }

  const connectedIds = new Set<string>();
  connectedIds.add(activeId);

  // Downward (descendants)
  let queue = [activeId];
  while(queue.length > 0) {
    const curr = queue.shift()!;
    edges.filter(e => e.source === curr).forEach(e => {
      connectedIds.add(e.target);
      queue.push(e.target);
    });
  }

  // Upward (ancestors)
  queue = [activeId];
  while(queue.length > 0) {
    const curr = queue.shift()!;
    edges.filter(e => e.target === curr).forEach(e => {
      connectedIds.add(e.source);
      queue.push(e.source);
    });
  }

  return nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      isHighlighted: connectedIds.has(n.id),
      isFaded: !connectedIds.has(n.id)
    }
  }));
};


export const useFamilyTreeStore = create<FamilyTreeState>((set, get) => ({
  nodes: [],
  edges: [],
  
  activeViewMode: 'tree',
  experienceMode: 'EXPLORE',
  activeUniverse: 'MAIN_COSMIC_TREE',
  selectedNodeId: null,
  hoveredNodeId: null,
  expandedNodes: new Set<string>(),
  
  activeFilters: [],
  relationshipStartNode: null,
  relationshipEndNode: null,
  relationshipPath: [],
  storyIndex: -1,
  
  setExperienceMode: (mode) => set({ experienceMode: mode }),
  setViewMode: (mode) => set({ activeViewMode: mode }),
  
  selectNode: (id) => {
    set((state) => {
      // Don't shift to profile if we are in story mode
      const newMode = state.experienceMode === 'STORY' ? 'STORY' : (id ? 'PROFILE' : 'EXPLORE');
      const newNodes = computeHighlightState(state.nodes, state.edges, state.hoveredNodeId, id, state.relationshipPath, state.activeFilters);
      return { selectedNodeId: id, experienceMode: newMode, nodes: newNodes };
    });
  },

  setHoveredNode: (id) => {
    set((state) => {
      if (state.selectedNodeId || state.relationshipPath.length > 0 || state.activeFilters.length > 0) {
        // Skip hover overrides if something more important is active
        if (state.selectedNodeId && id !== null) return { hoveredNodeId: id };
      }
      const newNodes = computeHighlightState(state.nodes, state.edges, id, state.selectedNodeId, state.relationshipPath, state.activeFilters);
      return { hoveredNodeId: id, nodes: newNodes };
    });
  },

  toggleExpandNode: (id) => {
    set((state) => {
      const newExpanded = new Set(state.expandedNodes);
      if (newExpanded.has(id)) newExpanded.delete(id);
      else newExpanded.add(id);
      return { expandedNodes: newExpanded };
    });
  },

  loadUniverse: (universeKey: string) => {
    // 1. Build sanitized raw graph (layout is built-in for MAIN_COSMIC_TREE)
    const { nodes, edges } = buildUniverseGraph(universeKey);
    
    set({
      activeUniverse: universeKey,
      nodes,
      edges,
      selectedNodeId: null, // Reset selection when jumping universes
      relationshipPath: [], // Reset paths
      experienceMode: 'EXPLORE'
    });
  },

  initializeLayout: () => {
    const { activeUniverse } = get();
    get().loadUniverse(activeUniverse);
  },

  // Phase 3 Actions
  setFilters: (filters) => {
    set((state) => {
      const newNodes = computeHighlightState(state.nodes, state.edges, state.hoveredNodeId, state.selectedNodeId, state.relationshipPath, filters);
      return { activeFilters: filters, nodes: newNodes };
    });
  },

  setRelationshipStart: (id) => {
    set({ relationshipStartNode: id });
    const { relationshipStartNode, relationshipEndNode, nodes, edges } = get();
    if (relationshipStartNode && relationshipEndNode) {
      // Pathfinding was removed for optimization
      set({ relationshipPath: [] });
      get().setFilters([]); // Clear filters to show path
    } else {
      set({ relationshipPath: [] });
    }
  },

  setRelationshipEnd: (id) => {
    set({ relationshipEndNode: id });
    const { relationshipStartNode, relationshipEndNode, nodes, edges } = get();
    if (relationshipStartNode && relationshipEndNode) {
      // Pathfinding was removed for optimization
      set({ relationshipPath: [] });
      get().setFilters([]);
    } else {
      set({ relationshipPath: [] });
    }
  },

  setStoryIndex: (index) => set((state) => ({ 
    storyIndex: index,
    experienceMode: index >= 0 ? 'STORY' : 'EXPLORE'
  }))
}));

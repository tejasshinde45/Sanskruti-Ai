import { Node, Edge } from '@xyflow/react';

export type NodeTypeVariants = 
  | 'supreme' 
  | 'trimurti' 
  | 'prajapati' 
  | 'human' 
  | 'cluster' // New: for grouping descendants
  | 'special';

export type ImportanceLevel = 'supreme' | 'cosmic' | 'major' | 'secondary' | 'minor';

export interface CosmicNodeData {
  id: string; // Canonical ID
  label: string; 
  title?: string; // Padvi
  description?: string; 
  image?: string; 
  realm?: string; 
  icon?: string; 
  variant: NodeTypeVariants; 
  importance?: ImportanceLevel;
  
  glowColor?: string;
  borderColor?: string;
  
  // Phase 2 Interaction State
  hasChildren?: boolean; // Whether this node can be expanded
  isExpanded?: boolean;
  isHovered?: boolean;

  // Phase 4: Cluster
  isClusterNode: boolean;
  clusterSize?: number;
  clusterNames?: string[];

  // Visual State
  isHighlighted: boolean; // True if in the active lineage path
  isFaded?: boolean; // True if unrelated to the active lineage path
}

export type CosmicNode = Node<CosmicNodeData>;
export type CosmicEdge = Edge;

export interface DeityProfile {
  id: string;
  name: string;
  sanskritName?: string;
  aliases?: string[];
  role?: string;
  
  // Advanced Relational Schema
  parents?: string[];
  consorts?: string[];
  children?: string[];
  dynasty?: string; // e.g., 'Solar', 'Lunar'
  category?: string; // e.g., 'Deva', 'Asura', 'Naga'
  
  // Cinematic Details
  weapon?: string;
  vahana?: string; // Vehicle/Mount
  symbolism?: string;
  mantra?: string;
  fullLore?: string;
  significance?: string; // Cultural or cosmic impact
  
  // Deep References
  associatedTexts?: string[]; // e.g., 'Rig Veda', 'Shiva Purana'
  facts?: string[];
  avatarConnections?: string[]; // IDs of avatars
  relatedEvents?: string[]; // e.g., 'Samudra Manthan'
}

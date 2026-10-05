import { CosmicNode, CosmicEdge } from '../types/familyTree';
import { MAIN_TREE_NODES, MAIN_TREE_EDGES } from '../data/mainCosmicTree';

export const buildUniverseGraph = (universeKey: string): { nodes: CosmicNode[], edges: CosmicEdge[] } => {
  // We only support the hand-crafted MAIN_COSMIC_TREE now, since dynamic subtrees were removed for optimization.
  return { nodes: MAIN_TREE_NODES, edges: MAIN_TREE_EDGES };
};

import { CosmicNode, CosmicEdge } from '../types/familyTree';

// ═══════════════════════════════════════════════════════════════
// HAND-CRAFTED DIVINE ANCESTRY TREE
// Flow: Parabrahman → Trimurti → Prajapatis → Races → Dynasties → Humans
// Each node has a precise cinematic position.
// ═══════════════════════════════════════════════════════════════

const NODE_W = 260;
const ROW = (r: number) => r * 450; // Increased vertical spacing for clear bezier curves

// Helper for centered positions
const pos = (x: number, y: number) => ({ x: x - NODE_W / 2, y });
const nodeData = (id: string, label: string, title: string, description: string, realm: string, variant: string, importance: string, hasChildren: boolean = true, isClusterNode: boolean = false, clusterSize?: number, clusterNames?: string[]) => ({
  id, label, title, description, realm, variant, importance, hasChildren, isClusterNode, clusterSize, clusterNames, isHighlighted: false, isFaded: false, isExpanded: false
});

export const MAIN_TREE_NODES: CosmicNode[] = [
  // ── LAYER 0: The Supreme ─────────────────────────────────────
  { id: 'parabrahman', type: 'supreme', position: pos(200, ROW(0)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('parabrahman', 'Parabrahman', 'The Supreme Absolute', 'Supreme Reality', 'Beyond All Lokas', 'supreme', 'supreme') },

  // ── LAYER 1: The Trimurti ────────────────────────────────────
  { id: 'brahma', type: 'trimurti', position: pos(-300, ROW(1)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('brahma', 'Brahma', 'The Creator', 'Trimurti', 'Satya Loka', 'trimurti', 'cosmic') },
  { id: 'vishnu', type: 'trimurti', position: pos(200, ROW(1)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('vishnu', 'Vishnu', 'The Preserver', 'Trimurti', 'Vaikuntha', 'trimurti', 'cosmic') },
  { id: 'shiva', type: 'trimurti', position: pos(700, ROW(1)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('shiva', 'Shiva', 'The Destroyer', 'Trimurti', 'Kailash', 'trimurti', 'cosmic') },

  // ── LAYER 2: Key Prajapatis ──────────────────────────────────
  { id: 'marichi', type: 'prajapati', position: pos(-1200, ROW(2)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('marichi', 'Marichi', 'Mind-Born Son', 'Saptarishi / Prajapati', 'Mahar Loka', 'prajapati', 'major') },
  { id: 'daksha', type: 'prajapati', position: pos(-600, ROW(2)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('daksha', 'Daksha', 'Chief Prajapati', 'Prajapati / Saptarishi', 'Earth', 'prajapati', 'cosmic') },
  { id: 'manu', type: 'prajapati', position: pos(0, ROW(2)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('manu', 'Swayambhuva Manu', 'First Man', 'Manu / Prajapati', 'Earth', 'prajapati', 'major') },
  { id: 'atri', type: 'prajapati', position: pos(600, ROW(2)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('atri', 'Atri', 'Mind-Born Son', 'Saptarishi', 'Mahar Loka', 'prajapati', 'major') },

  // ── LAYER 3: Key Lineage Roots ───────────────────────────────
  { id: 'kashyapa', type: 'prajapati', position: pos(-1200, ROW(3)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('kashyapa', 'Kashyapa', 'Father of All Beings', 'Prajapati / Saptarishi', 'Earth', 'prajapati', 'cosmic') },
  { id: 'aditi', type: 'special', position: pos(-800, ROW(3)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('aditi', 'Aditi', 'Mother of Devas', 'Celestial Mother', 'Svarga Loka', 'special', 'major') },
  { id: 'vinata', type: 'special', position: pos(-400, ROW(3)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('vinata', 'Vinata', 'Mother of Birds', 'Celestial Mother', 'Earth', 'special', 'major') },
  { id: 'chandra', type: 'special', position: pos(600, ROW(3)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('chandra', 'Chandra', 'The Moon God', 'Deva', 'Chandra Loka', 'special', 'major') },
  { id: 'dattatreya', type: 'special', position: pos(1000, ROW(3)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('dattatreya', 'Dattatreya', 'Trinity Incarnation', 'Avatar / Sage', 'Earth', 'special', 'major', false) },

  // ── LAYER 4: Major Children / Dynasty Roots ──────────────────
  { id: 'shesha', type: 'special', position: pos(-1600, ROW(4)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('shesha', 'Ananta Shesha', 'King of Nagas', 'Naga / Divine', 'Patala Loka', 'special', 'cosmic', false) },
  { id: 'indra', type: 'special', position: pos(-1200, ROW(4)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('indra', 'Indra', 'King of Devas', 'Deva', 'Svarga Loka', 'special', 'major') },
  { id: 'garuda', type: 'special', position: pos(-800, ROW(4)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('garuda', 'Garuda', 'King of Birds', 'Divine Bird', 'Vaikuntha', 'special', 'major', false) },
  { id: 'surya', type: 'special', position: pos(-400, ROW(4)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('surya', 'Surya', 'The Sun God', 'Deva / Aditya', 'Surya Loka', 'special', 'major') },
  { id: 'ikshvaku', type: 'special', position: pos(0, ROW(4)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('ikshvaku', 'Ikshvaku', 'Solar Dynasty Founder', 'Human King', 'Ayodhya', 'special', 'major') },
  { id: 'pururavas', type: 'special', position: pos(600, ROW(4)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('pururavas', 'Pururavas', 'Lunar Dynasty Founder', 'Human King', 'Earth', 'special', 'major') },

  // ── LAYER 5: Epic Heroes ─────────────────────────────────────
  { id: 'rama', type: 'trimurti', position: pos(0, ROW(5)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('rama', 'Shri Rama', '7th Avatar of Vishnu', 'Avatar / Human King', 'Ayodhya', 'trimurti', 'supreme') },
  { id: 'krishna', type: 'trimurti', position: pos(300, ROW(5)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('krishna', 'Shri Krishna', '8th Avatar of Vishnu', 'Avatar', 'Earth', 'trimurti', 'supreme') },
  { id: 'pandavas_cluster', type: 'cluster', position: pos(600, ROW(5)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('pandavas_cluster', 'The Pandavas', 'Five Sons of Pandu', 'Sacred Cluster', 'Hastinapura', 'cluster', 'major', true, true, 5, ['Yudhishthira', 'Bhima', 'Arjuna', 'Nakula', 'Sahadeva']) },
  { id: 'vyasa', type: 'special', position: pos(900, ROW(5)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('vyasa', 'Vyasa', 'Author of Mahabharata', 'Sage / Avatar', 'Earth', 'special', 'major') },

  // ── LAYER 6: End — Modern Humanity ───────────────────────────
  { id: 'humanity_node', type: 'human', position: pos(300, ROW(6)), targetPosition: 'top' as any, sourcePosition: 'bottom' as any, data: nodeData('humanity_node', 'Humanity', 'You & All of Us', 'Modern Human', 'Earth — Present Day', 'human', 'major', false) },
];

export const MAIN_TREE_EDGES: CosmicEdge[] = [
  // ── Edge Styling (Using Bezier Curves 'default' for organic flow)
  // Parabrahman → Trimurti
  { id: 'e-pb-b', source: 'parabrahman', target: 'brahma', type: 'default', animated: true, style: { stroke: 'rgba(251,191,36,0.7)', strokeWidth: 3 } },
  { id: 'e-pb-v', source: 'parabrahman', target: 'vishnu', type: 'default', animated: true, style: { stroke: 'rgba(251,191,36,0.7)', strokeWidth: 3 } },
  { id: 'e-pb-s', source: 'parabrahman', target: 'shiva', type: 'default', animated: true, style: { stroke: 'rgba(251,191,36,0.7)', strokeWidth: 3 } },

  // Brahma → Prajapatis
  { id: 'e-b-marichi', source: 'brahma', target: 'marichi', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.6)', strokeWidth: 2 } },
  { id: 'e-b-daksha', source: 'brahma', target: 'daksha', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.6)', strokeWidth: 2 } },
  { id: 'e-b-manu', source: 'brahma', target: 'manu', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.6)', strokeWidth: 2 } },
  { id: 'e-b-atri', source: 'brahma', target: 'atri', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.6)', strokeWidth: 2 } },

  // Marichi → Kashyapa
  { id: 'e-m-k', source: 'marichi', target: 'kashyapa', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.5)', strokeWidth: 2 } },

  // Daksha → Aditi, Vinata
  { id: 'e-d-aditi', source: 'daksha', target: 'aditi', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.5)', strokeWidth: 2 } },
  { id: 'e-d-vinata', source: 'daksha', target: 'vinata', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.5)', strokeWidth: 2 } },

  // Atri → Chandra, Dattatreya
  { id: 'e-at-chandra', source: 'atri', target: 'chandra', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.5)', strokeWidth: 2 } },
  { id: 'e-at-datta', source: 'atri', target: 'dattatreya', type: 'default', animated: true, style: { stroke: 'rgba(34,211,238,0.5)', strokeWidth: 2 } },

  // Kashyapa + Aditi → Indra, Surya
  { id: 'e-k-indra', source: 'kashyapa', target: 'indra', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.5)', strokeWidth: 2 } },
  { id: 'e-a-indra', source: 'aditi', target: 'indra', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.4)', strokeWidth: 1.5 } },
  { id: 'e-k-surya', source: 'kashyapa', target: 'surya', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.5)', strokeWidth: 2 } },
  { id: 'e-a-surya', source: 'aditi', target: 'surya', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.4)', strokeWidth: 1.5 } },

  // Kashyapa + Vinata → Garuda
  { id: 'e-k-garuda', source: 'kashyapa', target: 'garuda', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.5)', strokeWidth: 2 } },
  { id: 'e-v-garuda', source: 'vinata', target: 'garuda', type: 'default', animated: true, style: { stroke: 'rgba(245,158,11,0.4)', strokeWidth: 1.5 } },

  // Kashyapa → Shesha
  { id: 'e-k-shesha', source: 'kashyapa', target: 'shesha', type: 'default', animated: false, style: { stroke: 'rgba(217,70,239,0.4)', strokeWidth: 1.5 } },

  // Manu + Surya → Ikshvaku (Solar Dynasty)
  { id: 'e-mn-iksh', source: 'manu', target: 'ikshvaku', type: 'default', animated: true, style: { stroke: 'rgba(251,191,36,0.5)', strokeWidth: 2 } },
  { id: 'e-s-iksh', source: 'surya', target: 'ikshvaku', type: 'default', animated: false, style: { stroke: 'rgba(251,191,36,0.3)', strokeWidth: 1.5 } },

  // Chandra → Pururavas (Lunar Dynasty)
  { id: 'e-ch-pur', source: 'chandra', target: 'pururavas', type: 'default', animated: true, style: { stroke: 'rgba(99,102,241,0.5)', strokeWidth: 2 } },

  // Solar → Rama
  { id: 'e-iksh-rama', source: 'ikshvaku', target: 'rama', type: 'default', animated: true, style: { stroke: 'rgba(251,191,36,0.6)', strokeWidth: 2.5 } },

  // Lunar → Krishna, Pandavas, Vyasa
  { id: 'e-pur-krishna', source: 'pururavas', target: 'krishna', type: 'default', animated: true, style: { stroke: 'rgba(99,102,241,0.6)', strokeWidth: 2.5 } },
  { id: 'e-pur-pandavas', source: 'pururavas', target: 'pandavas_cluster', type: 'default', animated: true, style: { stroke: 'rgba(99,102,241,0.5)', strokeWidth: 2 } },
  { id: 'e-pur-vyasa', source: 'pururavas', target: 'vyasa', type: 'default', animated: true, style: { stroke: 'rgba(99,102,241,0.4)', strokeWidth: 1.5 } },

  // Epic Heroes → Humanity
  { id: 'e-rama-human', source: 'rama', target: 'humanity_node', type: 'default', animated: true, style: { stroke: 'rgba(251,191,36,0.7)', strokeWidth: 3 } },
  { id: 'e-krishna-human', source: 'krishna', target: 'humanity_node', type: 'default', animated: true, style: { stroke: 'rgba(99,102,241,0.7)', strokeWidth: 3 } },
  { id: 'e-pandavas-human', source: 'pandavas_cluster', target: 'humanity_node', type: 'default', animated: true, style: { stroke: 'rgba(99,102,241,0.5)', strokeWidth: 2 } },
  { id: 'e-vyasa-human', source: 'vyasa', target: 'humanity_node', type: 'default', animated: false, style: { stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1.5 } },
];

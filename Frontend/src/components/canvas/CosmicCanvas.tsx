import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';

import SupremeNode from '../nodes/SupremeNode';
import TrimurtiNode from '../nodes/TrimurtiNode';
import PrajapatiNode from '../nodes/PrajapatiNode';
import HumanNode from '../nodes/HumanNode';
import SpecialNode from '../nodes/SpecialNode';
import ClusterNode from '../nodes/ClusterNode';

const nodeTypes = {
  supreme: SupremeNode,
  trimurti: TrimurtiNode,
  prajapati: PrajapatiNode,
  human: HumanNode,
  special: SpecialNode,
  cluster: ClusterNode,
} as const;

const CosmicCanvas = () => {
  const nodes = useFamilyTreeStore(state => state.nodes);
  const edges = useFamilyTreeStore(state => state.edges);

  return (
    <div className="absolute inset-0 w-full h-full z-0 touch-none">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        fitView
        fitViewOptions={{ padding: 0.12, minZoom: 0.05, maxZoom: 0.75 }}
        minZoom={0.03}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: 'default', // Using default (bezier) for beautiful, non-grid organic lines
          animated: true,
          style: { stroke: 'rgba(245,158,11,0.45)', strokeWidth: 2 }
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={40}
          size={1}
          color="rgba(255,255,255,0.035)"
        />
        <Controls
          className="bg-black/70 border border-amber-500/10 fill-amber-100 !bottom-8 !left-4 shadow-[0_0_15px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden backdrop-blur-md"
          showInteractive={false}
        />
        <MiniMap
          className="!bg-[#0a0f25]/80 !border !border-amber-500/20 !rounded-xl !bottom-8 !right-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md"
          maskColor="rgba(3,7,18,0.85)"
          nodeColor={(n: any) => {
            switch (n.type || n.data?.variant) {
              case 'supreme':    return '#fbbf24';
              case 'trimurti':   return '#f59e0b';
              case 'prajapati':  return '#22d3ee';
              case 'special':    return '#d946ef';
              case 'cluster':    return '#6366f1';
              case 'human':      return '#94a3b8';
              default:           return '#475569';
            }
          }}
        />
      </ReactFlow>

      {/* ── DIVINE EDGE ENGINE ────────────────────────────────── */}
      <style>{`
        .react-flow__edge-path {
          stroke: rgba(245,158,11,0.45);
          stroke-width: 2px;
          stroke-linecap: round;
          filter: drop-shadow(0 0 5px rgba(245,158,11,0.45));
        }
        .react-flow__edge.animated .react-flow__edge-path {
          stroke-dasharray: 8 5;
          animation: divineFlow 4s linear infinite;
        }
        @keyframes divineFlow {
          from { stroke-dashoffset: 130; }
          to   { stroke-dashoffset: 0; }
        }
        .react-flow__edge:hover .react-flow__edge-path {
          stroke: rgba(251,191,36,0.9);
          filter: drop-shadow(0 0 12px rgba(251,191,36,0.8));
          stroke-width: 3px;
        }
        /* Hide default RF node styling */
        .react-flow__node-default,
        .react-flow__node-input,
        .react-flow__node-output {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        /* Remove RF selection outline — we handle it in BaseNodeWrapper */
        .react-flow__node.selected > div {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default CosmicCanvas;

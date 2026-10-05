import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { useFamilyTreeStore } from '../store/useFamilyTreeStore';
import { COSMIC_THEME } from '../utils/themeConstants';

export interface CameraTarget {
  type: 'node' | 'cluster';
  ids: string[]; // Can target one or many nodes
  zoomLevel?: number;
  offsetY?: number;
}

/**
 * Phase 4 Cinematic Camera Control
 * Supports zooming to single nodes or framing entire clusters (e.g. The Trimurti)
 */
export const useCameraControl = () => {
  const { setCenter, fitBounds, getNodes, getNode } = useReactFlow();
  const selectNode = useFamilyTreeStore(state => state.selectNode);

  const flyToComposition = useCallback((target: CameraTarget, openProfile: boolean = false) => {
    
    // If targeting a single node
    if (target.type === 'node' && target.ids.length === 1) {
      const nodeId = target.ids[0];
      const node = getNode(nodeId);
      if (!node) return;

      const dimensions = COSMIC_THEME.nodeSizes[node.data.variant] || COSMIC_THEME.nodeSizes.default;
      
      let x = node.position.x + dimensions.width / 2;
      let y = node.position.y + dimensions.height / 2;

      let targetZoom = target.zoomLevel || 1;
      if (!target.zoomLevel) {
        if (node.data.variant === 'supreme') targetZoom = 0.6;
        else if (node.data.variant === 'trimurti') targetZoom = 0.8;
        else targetZoom = 1.2;
      }

      if (openProfile) {
        x += 200 / targetZoom; 
      }

      if (target.offsetY) {
        // Negative offsetY means nodes move UP, so camera Y must move DOWN (increase)
        y -= target.offsetY / targetZoom; 
      }

      setCenter(x, y, { zoom: targetZoom, duration: 1500 });

      if (openProfile) {
        setTimeout(() => selectNode(nodeId), 1000);
      }
    } 
    // If targeting a group of nodes (Cluster Framing)
    else if (target.ids.length > 1) {
      const nodes = getNodes().filter(n => target.ids.includes(n.id));
      if (nodes.length === 0) return;

      // Calculate bounding box for all targets
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
      nodes.forEach(node => {
        const dim = COSMIC_THEME.nodeSizes[node.data.variant] || COSMIC_THEME.nodeSizes.default;
        if (node.position.x < minX) minX = node.position.x;
        if (node.position.y < minY) minY = node.position.y;
        if (node.position.x + dim.width > maxX) maxX = node.position.x + dim.width;
        if (node.position.y + dim.height > maxY) maxY = node.position.y + dim.height;
      });

      // Calculate the center of the bounding box
      let centerX = minX + (maxX - minX) / 2;
      let centerY = minY + (maxY - minY) / 2;

      // Calculate zoom to fit width or height with padding
      const paddingX = 600; // Total horizontal padding in canvas units
      const paddingY = 400; // Total vertical padding
      
      const contentWidth = (maxX - minX) + paddingX;
      const contentHeight = (maxY - minY) + paddingY;
      
      // Get actual viewport dimensions or fallback
      const viewportWidth = window.innerWidth || 1920; 
      const viewportHeight = window.innerHeight || 1080;

      const zoomX = viewportWidth / contentWidth;
      const zoomY = viewportHeight / contentHeight;
      
      // Take the smaller zoom to ensure both width and height fit
      let targetZoom = Math.min(zoomX, zoomY);

      // Clamp zoom levels for clusters
      if (targetZoom > 1.1) targetZoom = 1.1;
      if (targetZoom < 0.15) targetZoom = 0.15;

      // Apply framing offset if needed (especially for story mode narration bar)
      if (target.offsetY) {
        // Negative offsetY means nodes move UP, so camera Y must move DOWN (increase)
        centerY -= target.offsetY / targetZoom; 
      }

      setCenter(centerX, centerY, { zoom: targetZoom, duration: 2000 });
    }
  }, [setCenter, getNodes, getNode, selectNode]);

  return { flyToComposition };
};

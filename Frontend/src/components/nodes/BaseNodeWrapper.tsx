import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useFamilyTreeStore } from '../../store/useFamilyTreeStore';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BaseNodeWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  glowClass?: string;
  isRoot?: boolean;
  hasChildren?: boolean;
  isFaded?: boolean;
  isHighlighted?: boolean;
}

const BaseNodeWrapper = ({ 
  id,
  children, 
  className, 
  glowClass, 
  isRoot,
  isFaded,
  isHighlighted
}: BaseNodeWrapperProps) => {

  const setHoveredNode = useFamilyTreeStore((state) => state.setHoveredNode);
  const selectNode = useFamilyTreeStore((state) => state.selectNode);
  const loadUniverse = useFamilyTreeStore((state) => state.loadUniverse);
  
  const handleClick = () => {
    selectNode(id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ 
        opacity: isFaded ? 0.2 : 1, 
        scale: 1,
        filter: isFaded ? 'grayscale(60%)' : 'none'
      }}
      whileHover={{ scale: isFaded ? 1 : 1.04, zIndex: 60 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => setHoveredNode(id)}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={handleClick}
      className={cn(
        "relative rounded-xl overflow-hidden bg-[#0a0f25] border transition-all duration-500 cursor-pointer",
        isHighlighted && "ring-2 ring-amber-400/60 ring-offset-1 ring-offset-transparent",
        glowClass,
        className
      )}
    >
      {!isRoot && <Handle type="target" position={Position.Top} className="opacity-0 !w-2 !h-2" />}
      
      {children}

      <Handle type="source" position={Position.Bottom} className="opacity-0 !w-2 !h-2" />
    </motion.div>
  );
};

export default memo(BaseNodeWrapper);

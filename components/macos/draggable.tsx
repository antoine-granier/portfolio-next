"use client";

import { motion, useDragControls } from "framer-motion";
import { createContext, useContext, useRef, useState, useCallback } from "react";

// Global z-index counter for window stacking
let globalZCounter = 10;

function getNextZ() {
  return ++globalZCounter;
}

const DragControlsContext = createContext<ReturnType<typeof useDragControls> | null>(null);

export function useDragHandle() {
  return useContext(DragControlsContext);
}

interface DraggableProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  handleOnly?: boolean;
}

export function Draggable({ children, className = "", style, handleOnly = true }: DraggableProps) {
  const controls = useDragControls();
  const [zIndex, setZIndex] = useState(10);

  const bringToFront = useCallback(() => {
    setZIndex(getNextZ());
  }, []);

  if (!handleOnly) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        whileDrag={{ scale: 1.02 }}
        onPointerDown={bringToFront}
        style={{ ...style, zIndex }}
        className={`cursor-grab active:cursor-grabbing ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <DragControlsContext.Provider value={controls}>
      <motion.div
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.05}
        whileDrag={{ scale: 1.02 }}
        onPointerDown={bringToFront}
        style={{ ...style, zIndex }}
        className={className}
      >
        {children}
      </motion.div>
    </DragControlsContext.Provider>
  );
}

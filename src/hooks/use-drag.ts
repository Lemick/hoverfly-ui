import { useEffect, useRef } from 'react';

export default function useDrag(onMouseMove: (event: MouseEvent) => void) {
  const isDraggingRef = useRef(false);

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraggingRef.current) {
      onMouseMove(event);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return {
    start: handleMouseDown,
    stop: handleMouseUp
  };
}

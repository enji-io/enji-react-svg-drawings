import type React from 'react';
import type { Point } from '@/types/geometry';

interface StraightBarProps {
  position: Point;
  length: number;
  diameter: number;
  color?: string;
  rotation?: number;
}

const StraightBar: React.FC<StraightBarProps> = ({ position, length, diameter, color = '#000', rotation = 0 }) => {
  // Calculate the points for the straight bar
  const points = {
    start: {
      x: position.x,
      y: position.y + diameter,
    },
    end: {
      x: position.x + length,
      y: position.y + diameter,
    },
    topOffset: {
      x: position.x,
      y: position.y,
    },
    bottomOffset: {
      x: position.x,
      y: position.y + diameter,
    },
  };

  // Create the path for the bar
  const path = `
    M ${points.topOffset.x} ${points.topOffset.y}
    L ${points.end.x} ${points.topOffset.y}
    L ${points.end.x} ${points.bottomOffset.y}
    L ${points.start.x} ${points.bottomOffset.y}
    Z
  `;

  return (
    <path
      d={path}
      fill="white"
      stroke={color}
      strokeWidth="1"
      transform={`rotate(${-rotation}, ${position.x}, ${position.y})`}
    />
  );
};

export default StraightBar;

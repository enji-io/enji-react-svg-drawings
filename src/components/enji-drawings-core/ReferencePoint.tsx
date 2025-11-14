import React from 'react';
import Text from './Text';
import { Point } from '@/types/geometry';

interface ReferencePointProps {
  position: Point;
  label?: {
    x: string;
    y: string;
  };
  className?: string;
}

const ReferencePoint: React.FC<ReferencePointProps> = ({
  position,
  label = {
    x: `X: ${position.x}`,
    y: `Y: ${position.y}`,
  },
  className,
}) => {
  return (
    <g className={className}>
      {/* Vertical reference line */}
      <line
        stroke="blue"
        strokeDasharray="4"
        strokeWidth="1"
        x1={position.x}
        x2={position.x}
        y1={50}
        y2={position.y}
      />
      {/* Horizontal reference line */}
      <line
        stroke="blue"
        strokeDasharray="4"
        strokeWidth="1"
        x1={50}
        x2={position.x}
        y1={position.y}
        y2={position.y}
      />
      {/* Reference point */}
      <circle
        cx={position.x}
        cy={position.y}
        fill="blue"
        r={4}
      />
      {/* Labels */}
      <Text
        fill="blue"
        position={{ x: position.x + 5, y: 70 }}
      >
        {label.x}
      </Text>
      <Text
        fill="blue"
        position={{ x: 60, y: position.y + 15 }}
      >
        {label.y}
      </Text>
    </g>
  );
};

export default ReferencePoint;

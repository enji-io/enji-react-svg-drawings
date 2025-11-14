import React from 'react';
import { Point } from '@/types/geometry';

interface RadiusAnnotationProps {
  center: Point;
  radius: number;
  color: string;
}

const RadiusAnnotation: React.FC<RadiusAnnotationProps> = ({ center, radius, color }) => {
  return (
    <>
      {/* Radius circle */}
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={0.5}
        strokeDasharray="2,2"
      />

      {/* Radius arrow and text */}
      <line
        x1={center.x}
        y1={center.y}
        x2={center.x - radius}
        y2={center.y}
        stroke={color}
        strokeWidth={0.5}
        markerEnd="url(#arrowhead)"
      />

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={color}
          />
        </marker>
      </defs>

      {/* Radius text */}
      <text
        x={center.x}
        y={center.y + 10}
        fill={color}
        fontSize="10"
        textAnchor="end"
      >
        R{radius}
      </text>
    </>
  );
};

export default RadiusAnnotation;

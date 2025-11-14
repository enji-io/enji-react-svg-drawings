import React from 'react';
import { Point } from '@/types/geometry';

type HatchPattern = 'concrete' | 'none';

interface RectangularOutlineProps {
  position: Point;
  width: number;
  height: number;
  strokeWidth?: number;
  strokeColor?: string;
  fill?: string;
  className?: string;
  hatch?: HatchPattern;
}

const RectangularOutline: React.FC<RectangularOutlineProps> = ({
  position,
  width,
  height,
  strokeWidth = 2,
  strokeColor = 'black',
  fill = 'none',
  className,
  hatch = 'none',
}) => {
  return (
    <g>
      <defs>
        <pattern
          height="40"
          id="concrete-pattern"
          patternUnits="userSpaceOnUse"
          width="40"
        >
          {/* Scattered aggregate shapes */}
          <path
            d="M10,10 L13,14 L7,14 Z"
            fill="#ddd"
          />
          <path
            d="M30,15 L33,19 L27,19 Z"
            fill="#ddd"
          />
          <path
            d="M20,25 L24,30 L16,30 Z"
            fill="#ddd"
          />
          <path
            d="M5,35 L9,38 L3,37 Z"
            fill="#ddd"
          />
          <path
            d="M35,5 L38,9 L32,8 Z"
            fill="#ddd"
          />
          <path
            d="M25,35 L28,38 L23,38 Z"
            fill="#ddd"
          />
          <path
            d="M15,5 L17,8 L13,8 Z"
            fill="#ddd"
          />
          <circle
            cx="8"
            cy="22"
            r="1.5"
            fill="#ddd"
          />
          <circle
            cx="28"
            cy="12"
            r="1.5"
            fill="#ddd"
          />
          <circle
            cx="35"
            cy="28"
            r="1.5"
            fill="#ddd"
          />
          <circle
            cx="18"
            cy="38"
            r="1.5"
            fill="#ddd"
          />
        </pattern>
      </defs>
      <rect
        className={className}
        fill={hatch === 'concrete' ? 'url(#concrete-pattern)' : fill}
        height={height}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        width={width}
        x={position.x}
        y={position.y}
      />
    </g>
  );
};

export default RectangularOutline;

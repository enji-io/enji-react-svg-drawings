import type React from 'react';
import type { Point } from '@/types/geometry';

interface RebarRowProps {
  position: Point;
  width: number;
  cover: number;
  rebarCount: number;
  rebarDiameter: number;
  stirrupBendingRadius: number;
  className?: string;
}

const RebarRow: React.FC<RebarRowProps> = ({
  position,
  width,
  cover,
  rebarCount,
  rebarDiameter,
  stirrupBendingRadius,
  className,
}) => {
  // Handle edge cases
  if (rebarCount <= 0 || rebarDiameter <= 0) {
    return null;
  }

  // location of most left rebar
  const adjustedStartX = position.x + cover + stirrupBendingRadius;
  // distance between most left and most right rebar
  const adjustedWidth = width - 2 * (cover + stirrupBendingRadius);

  // Calculate spacing only if there's more than one bar
  const spacing = rebarCount > 1 ? adjustedWidth / (rebarCount - 1) : 0;

  return (
    <g className={className}>
      {Array.from({ length: rebarCount }, (_, i) => {
        const cx = adjustedStartX + (rebarCount === 1 ? adjustedWidth / 2 : i * spacing);
        return (
          <circle
            key={`rebar-${position.x}-${position.y}-${cx}`}
            cx={cx}
            cy={position.y}
            fill="white"
            stroke="black"
            strokeWidth="1"
            r={rebarDiameter / 2}
          />
        );
      })}
    </g>
  );
};

export default RebarRow;

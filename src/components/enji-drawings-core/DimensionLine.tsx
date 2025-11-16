import type React from 'react';
import type { Point } from '@/types/geometry';
import { Text, ArrowMarker } from '@enji-drawings-core';

interface DimensionLineProps {
  start: Point;
  end: Point;
  label: string;
  switchPosition?: boolean;
  showMidpoint?: boolean;
  perpendicularOffset?: number;
}

const DimensionLine: React.FC<DimensionLineProps> = ({
  start,
  end,
  label,
  switchPosition = false,
  perpendicularOffset = 10, // Default 5px perpendicular offset
}) => {
  const ARROW_OFFSET = 3; // moves the arrow by the size of the arrow

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.atan2(dy, dx);
  const perpendicularAngle = angle + Math.PI / 2; // 90 degrees perpendicular to line

  // Apply perpendicular offset to start and end points
  const offsetDirection = switchPosition ? 1 : -1;
  const offsetStart = {
    x: start.x + offsetDirection * perpendicularOffset * Math.cos(perpendicularAngle),
    y: start.y + offsetDirection * perpendicularOffset * Math.sin(perpendicularAngle),
  };

  const offsetEnd = {
    x: end.x + offsetDirection * perpendicularOffset * Math.cos(perpendicularAngle),
    y: end.y + offsetDirection * perpendicularOffset * Math.sin(perpendicularAngle),
  };

  const dimLineStart = {
    x: offsetStart.x + ARROW_OFFSET * Math.cos(angle),
    y: offsetStart.y + ARROW_OFFSET * Math.sin(angle),
  };

  const dimLineEnd = {
    x: offsetEnd.x - ARROW_OFFSET * Math.cos(angle),
    y: offsetEnd.y - ARROW_OFFSET * Math.sin(angle),
  };

  const midPoint = {
    x: (dimLineStart.x + dimLineEnd.x) / 2,
    y: (dimLineStart.y + dimLineEnd.y) / 2,
  };

  // Calculate perpendicular offset for text placement
  const TEXT_OFFSET = 7; // pixels to offset text from the line

  const textRotation = (angle * 180) / Math.PI;

  const textPosition = {
    x: midPoint.x + offsetDirection * TEXT_OFFSET * Math.cos(perpendicularAngle),
    y: midPoint.y + offsetDirection * TEXT_OFFSET * Math.sin(perpendicularAngle),
  };

  const shouldFlipText = textRotation > 90 || textRotation < -90;
  const finalRotation = shouldFlipText ? textRotation + 180 : textRotation;

  return (
    <g>
      <ArrowMarker id="dimension-arrow" />
      {/* Thin extension lines connecting original points to dimension line */}
      <line stroke="gray" strokeWidth="0.5" x1={start.x} y1={start.y} x2={offsetStart.x} y2={offsetStart.y} />
      <line stroke="gray" strokeWidth="0.5" x1={end.x} y1={end.y} x2={offsetEnd.x} y2={offsetEnd.y} />
      {/* Main dimension line with arrows */}
      <line
        markerEnd="url(#dimension-arrow-end)"
        markerStart="url(#dimension-arrow-start)"
        stroke="black"
        strokeWidth="1"
        x1={dimLineStart.x}
        x2={dimLineEnd.x}
        y1={dimLineStart.y}
        y2={dimLineEnd.y}
      />
      <Text
        position={textPosition}
        textAnchor="middle"
        transform={`rotate(${finalRotation} ${textPosition.x} ${textPosition.y})`}
      >
        {label}
      </Text>
    </g>
  );
};

export default DimensionLine;

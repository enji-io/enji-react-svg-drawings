import React from 'react';
import { Point } from '@/types/geometry';

interface FullRectangleBarProps {
  position: Point;
  width: number;
  height: number;
  stirrupBendingRadius: number;
  thickness: number;
  color?: string;
}

const FullRectangleBar: React.FC<FullRectangleBarProps> = ({
  position,
  width,
  height,
  stirrupBendingRadius,
  thickness,
  color = '#000',
}) => {
  // Constants
  const hookAngle = 135; // Standard hook angle in degrees
  const hookRadians = (hookAngle * Math.PI) / 180;
  const hookLength = thickness * 6; // Standard hook length is typically 6 times the bar diameter

  // Calculate hook offsets
  const hookOffsets = {
    dx: hookLength * Math.cos(hookRadians),
    dy: hookLength * Math.sin(hookRadians),
    perpX: thickness * Math.cos(hookRadians - Math.PI / 2),
    perpY: thickness * Math.sin(hookRadians - Math.PI / 2),
  };

  // Main rectangle corner points
  const corners = {
    topLeft: { x: position.x + stirrupBendingRadius, y: position.y },
    topRight: { x: position.x + width - stirrupBendingRadius, y: position.y },
    bottomRight: { x: position.x + width - stirrupBendingRadius, y: position.y + height },
    bottomLeft: { x: position.x + stirrupBendingRadius, y: position.y + height },
  };

  // Right corner circle center for hooks
  const rightCornerCenter = {
    x: position.x + width - stirrupBendingRadius,
    y: position.y + stirrupBendingRadius,
  };

  // Calculate diagonal offset for bending radius
  const diagonalOffset = {
    outer: stirrupBendingRadius / Math.sqrt(2),
    inner: (stirrupBendingRadius - thickness) / Math.sqrt(2),
    outerPlus: (stirrupBendingRadius + thickness) / Math.sqrt(2),
  };

  // Right corner arc points
  const rightCornerArc = {
    outer: {
      start: {
        x: rightCornerCenter.x - diagonalOffset.outer,
        y: rightCornerCenter.y - diagonalOffset.outer,
      },
      mid: {
        x: rightCornerCenter.x + (stirrupBendingRadius * Math.sqrt(2)) / 2,
        y: rightCornerCenter.y - (stirrupBendingRadius * Math.sqrt(2)) / 2,
      },
      end: {
        x: rightCornerCenter.x + diagonalOffset.outer,
        y: rightCornerCenter.y + diagonalOffset.outer,
      },
    },
    inner: {
      start: {
        x: rightCornerCenter.x - diagonalOffset.inner,
        y: rightCornerCenter.y - diagonalOffset.inner,
      },
      mid: {
        x: rightCornerCenter.x + (stirrupBendingRadius * Math.sqrt(2)) / 2 - thickness / Math.sqrt(2),
        y: rightCornerCenter.y - (stirrupBendingRadius * Math.sqrt(2)) / 2 + thickness / Math.sqrt(2),
      },
      end: {
        x: rightCornerCenter.x + diagonalOffset.inner,
        y: rightCornerCenter.y + diagonalOffset.inner,
      },
    },
  };

  // straight lines going after the arc of the hook
  const hooks = {
    upper: {
      start: rightCornerArc.inner.start,
      end: {
        x: rightCornerCenter.x + hookOffsets.dx - diagonalOffset.inner,
        y: rightCornerCenter.y + hookOffsets.dy - diagonalOffset.inner,
      },
      startOffset: {
        x: rightCornerCenter.x - hookOffsets.perpX - diagonalOffset.inner,
        y: rightCornerCenter.y - hookOffsets.perpY - diagonalOffset.inner,
      },
      endOffset: {
        x: rightCornerCenter.x + hookOffsets.dx - hookOffsets.perpX - diagonalOffset.inner,
        y: rightCornerCenter.y + hookOffsets.dy - hookOffsets.perpY - diagonalOffset.inner,
      },
    },
    lower: {
      start: rightCornerArc.outer.end,
      end: {
        x: rightCornerCenter.x + hookOffsets.dx + diagonalOffset.inner,
        y: rightCornerCenter.y + hookOffsets.dy + diagonalOffset.inner,
      },
      startOffset: {
        x: rightCornerCenter.x - hookOffsets.perpX + diagonalOffset.outerPlus,
        y: rightCornerCenter.y - hookOffsets.perpY + diagonalOffset.outerPlus,
      },
      endOffset: {
        x: rightCornerCenter.x + hookOffsets.dx - hookOffsets.perpX + diagonalOffset.outerPlus,
        y: rightCornerCenter.y + hookOffsets.dy - hookOffsets.perpY + diagonalOffset.outerPlus,
      },
    },
  };

  // Main stirrup paths
  const outerPath = `
    M ${corners.topLeft.x} ${corners.topLeft.y}
    L ${corners.topRight.x} ${corners.topRight.y}
    A ${stirrupBendingRadius} ${stirrupBendingRadius} 0 0 1 ${position.x + width} ${position.y + stirrupBendingRadius}
    L ${position.x + width} ${position.y + height - stirrupBendingRadius}
    A ${stirrupBendingRadius} ${stirrupBendingRadius} 0 0 1 ${corners.bottomRight.x} ${corners.bottomRight.y}
    L ${corners.bottomLeft.x} ${corners.bottomLeft.y}
    A ${stirrupBendingRadius} ${stirrupBendingRadius} 0 0 1 ${position.x} ${position.y + height - stirrupBendingRadius}
    L ${position.x} ${position.y + stirrupBendingRadius}
    A ${stirrupBendingRadius} ${stirrupBendingRadius} 0 0 1 ${corners.topLeft.x} ${corners.topLeft.y}
  `;

  const innerPath = `
    M ${corners.topLeft.x} ${position.y + thickness}
    L ${corners.topRight.x} ${position.y + thickness}
    A ${stirrupBendingRadius - thickness} ${stirrupBendingRadius - thickness} 0 0 1 ${position.x + width - thickness} ${position.y + stirrupBendingRadius}
    L ${position.x + width - thickness} ${position.y + height - stirrupBendingRadius}
    A ${stirrupBendingRadius - thickness} ${stirrupBendingRadius - thickness} 0 0 1 ${corners.bottomRight.x} ${position.y + height - thickness}
    L ${corners.bottomLeft.x} ${position.y + height - thickness}
    A ${stirrupBendingRadius - thickness} ${stirrupBendingRadius - thickness} 0 0 1 ${position.x + thickness} ${position.y + height - stirrupBendingRadius}
    L ${position.x + thickness} ${position.y + stirrupBendingRadius}
    A ${stirrupBendingRadius - thickness} ${stirrupBendingRadius - thickness} 0 0 1 ${corners.topLeft.x} ${position.y + thickness}
  `;

  // Hook paths
  const upperHookPath = `
    M ${rightCornerArc.outer.mid.x} ${rightCornerArc.outer.mid.y}
    A ${stirrupBendingRadius} ${stirrupBendingRadius} 0 0 0 ${rightCornerArc.outer.start.x} ${rightCornerArc.outer.start.y}
    L ${hooks.upper.startOffset.x} ${hooks.upper.startOffset.y}
    L ${hooks.upper.endOffset.x} ${hooks.upper.endOffset.y}
    L ${hooks.upper.end.x} ${hooks.upper.end.y}
    L ${rightCornerArc.inner.start.x} ${rightCornerArc.inner.start.y}
    A ${stirrupBendingRadius - thickness} ${stirrupBendingRadius - thickness} 0 0 1 ${rightCornerArc.inner.mid.x} ${rightCornerArc.inner.mid.y}
    L ${rightCornerArc.outer.mid.x} ${rightCornerArc.outer.mid.y}
  `;

  const lowerHookPath = `
    M ${rightCornerArc.outer.mid.x} ${rightCornerArc.outer.mid.y}
    A ${stirrupBendingRadius} ${stirrupBendingRadius} 0 0 1 ${rightCornerArc.outer.end.x} ${rightCornerArc.outer.end.y}
    L ${hooks.lower.start.x} ${hooks.lower.start.y}
    L ${hooks.lower.endOffset.x} ${hooks.lower.endOffset.y}
    L ${hooks.lower.end.x} ${hooks.lower.end.y}
    L ${rightCornerArc.inner.end.x} ${rightCornerArc.inner.end.y}
    A ${stirrupBendingRadius - thickness} ${stirrupBendingRadius - thickness} 0 0 0 ${rightCornerArc.inner.mid.x} ${rightCornerArc.inner.mid.y}
    M ${rightCornerArc.outer.mid.x} ${rightCornerArc.outer.mid.y}
  `;

  return (
    <g>
      <path
        d={upperHookPath}
        fill="white"
        stroke={color}
        strokeWidth="1"
      />
      <path
        d={`${outerPath} ${innerPath}`}
        fill="white"
        fillRule="evenodd"
        stroke={color}
        strokeWidth="1"
      />
      <path
        d={lowerHookPath}
        fill="white"
        stroke={color}
        strokeWidth="1"
      />
    </g>
  );
};

export default FullRectangleBar;

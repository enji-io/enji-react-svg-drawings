import type { RefObject } from 'react';
import { DimensionLine, FullRectangleBar, RectangularOutline, RebarRow, Text } from '@enji-drawings-core';
import type { Point } from '@/types/geometry';
import type React from 'react';

export interface RectangularReinforcedConcreteSectionProps {
  startPoint?: Point;
  width: number;
  height: number;
  cover: number;
  bottomRebarDiameter: number;
  bottomRebarCount: number;
  concreteGrade: string;
  rebarGrade: string;
  topRebarDiameter?: number;
  topRebarCount?: number;
  stirrupThickness?: number;
  stirrupBendingRadius?: number;
  stirrupSpacing?: number;
  containerRef?: RefObject<HTMLDivElement>;
}

export const RectangularReinforcedConcreteSection: React.FC<RectangularReinforcedConcreteSectionProps> = ({
  startPoint = { x: 150, y: 150 },
  width,
  height,
  cover,
  bottomRebarDiameter,
  bottomRebarCount,
  concreteGrade = 'C25/30',
  rebarGrade = 'B500B',
  topRebarDiameter = 0,
  topRebarCount = 0,
  stirrupThickness = 0,
  stirrupBendingRadius = 0,
  stirrupSpacing = 0,
}) => {
  // Rebar dimensions
  const EFFECTIVE_COVER_BOTTOM = cover + stirrupThickness + bottomRebarDiameter / 2;
  const EFFECTIVE_COVER_TOP = cover + stirrupThickness + topRebarDiameter / 2;
  const d_eff_flex = height - EFFECTIVE_COVER_BOTTOM;

  return (
    <>
      {/* Section Title */}
      <Text fontSize={14} position={{ x: startPoint.x + width / 2, y: startPoint.y - 40 }} textAnchor="middle">
        RECTANGULAR RC SECTION
      </Text>

      {/* Material Specifications */}
      <Text fontSize={12} position={{ x: startPoint.x + width + 40, y: startPoint.y + 20 }} textAnchor="start">
        {`Concrete: ${concreteGrade}`}
      </Text>
      <Text fontSize={12} position={{ x: startPoint.x + width + 40, y: startPoint.y + 40 }} textAnchor="start">
        {`Reinforcement: ${rebarGrade}`}
      </Text>

      {/* Concrete outline with hatching */}
      <RectangularOutline hatch="concrete" height={height} position={startPoint} width={width} />

      <FullRectangleBar
        height={height - 2 * cover}
        position={{ x: startPoint.x + cover, y: startPoint.y + cover }}
        stirrupBendingRadius={stirrupBendingRadius}
        thickness={stirrupThickness}
        width={width - 2 * cover}
      />

      {/* Bottom reinforcement */}
      <RebarRow
        cover={cover}
        position={{ x: startPoint.x, y: startPoint.y + d_eff_flex }}
        rebarCount={bottomRebarCount}
        rebarDiameter={bottomRebarDiameter}
        stirrupBendingRadius={stirrupBendingRadius}
        width={width}
      />

      {/* Top reinforcement */}
      <RebarRow
        cover={cover}
        position={{ x: startPoint.x, y: startPoint.y + EFFECTIVE_COVER_TOP }}
        rebarCount={topRebarCount}
        rebarDiameter={topRebarDiameter}
        stirrupBendingRadius={stirrupBendingRadius}
        width={width}
      />

      {/* Main dimensions */}
      <DimensionLine
        switchPosition
        end={{ x: startPoint.x + width, y: startPoint.y + height + 10 }}
        label={`${width}mm`}
        start={{ x: startPoint.x, y: startPoint.y + height + 10 }}
      />

      <DimensionLine
        switchPosition
        end={{ x: startPoint.x - 20, y: startPoint.y + height }}
        label={`${height}mm`}
        start={{ x: startPoint.x - 20, y: startPoint.y }}
      />

      {/* Cover dimensions */}
      <DimensionLine
        end={{ x: startPoint.x + width + 30, y: startPoint.y + height }}
        label={`${cover}mm`}
        start={{ x: startPoint.x + width + 30, y: startPoint.y + height - cover }}
      />

      {/* Effective depth dimensions */}
      <DimensionLine
        switchPosition
        end={{ x: startPoint.x - 50, y: startPoint.y + d_eff_flex }}
        label={`d = ${d_eff_flex}mm`}
        start={{ x: startPoint.x - 50, y: startPoint.y }}
      />

      {/* Reinforcement labels */}
      <Text
        fontSize={12}
        position={{
          x: startPoint.x + EFFECTIVE_COVER_TOP + topRebarDiameter + 10,
          y: startPoint.y + EFFECTIVE_COVER_TOP + topRebarDiameter + 10,
        }}
      >
        {`${topRebarCount}T${topRebarDiameter}`}
      </Text>
      <Text
        fontSize={12}
        position={{
          x: startPoint.x + EFFECTIVE_COVER_BOTTOM + bottomRebarDiameter,
          y: startPoint.y + height - EFFECTIVE_COVER_BOTTOM - bottomRebarDiameter,
        }}
      >
        {`${bottomRebarCount}T${bottomRebarDiameter}`}
      </Text>

      {/* Stirrup label with spacing */}
      <Text
        fontSize={12}
        position={{ x: startPoint.x + width - cover - stirrupThickness - 10, y: startPoint.y + height / 2 }}
        textAnchor="end"
      >
        {`R${stirrupThickness}@${stirrupSpacing}`}
      </Text>

      {/* Section notes */}
      <Text fontSize={10} position={{ x: startPoint.x, y: startPoint.y + height + 60 }} textAnchor="start">
        Notes:
      </Text>
      <Text fontSize={10} position={{ x: startPoint.x, y: startPoint.y + height + 75 }} textAnchor="start">
        1. All dimensions are in millimeters
      </Text>
      <Text fontSize={10} position={{ x: startPoint.x, y: startPoint.y + height + 90 }} textAnchor="start">
        {`2. Clear spacing between bottom bars: ${Math.round((width - 2 * (cover + stirrupBendingRadius)) / (bottomRebarCount - 1) - bottomRebarDiameter)}mm`}
      </Text>
      <Text fontSize={10} position={{ x: startPoint.x, y: startPoint.y + height + 105 }} textAnchor="start">
        {`3. Clear spacing between top bars: ${Math.round((width - 2 * (cover + stirrupBendingRadius)) / (topRebarCount - 1) - topRebarDiameter)}mm`}
      </Text>
    </>
  );
};

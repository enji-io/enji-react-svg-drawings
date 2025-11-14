import { Button } from '@/components/ui/button';
import { Point } from '@/types/geometry';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ServerDrawingGridProps {
  gridStart: Point;
  gridEnd: Point;
  gridSize: number;
  labelInterval: number;
  strokeColor: string;
  strokeWidth: number;
  labelColor: string;
  labelFontSize: number;
  viewBox: Point;
  zoom: number;
  startPoint: Point;
}

export function ServerDrawingGrid({
  gridStart,
  gridEnd,
  gridSize,
  labelInterval,
  strokeColor,
  strokeWidth,
  labelColor,
  labelFontSize,
  viewBox,
  zoom,
  startPoint,
}: ServerDrawingGridProps) {
  const horizontalGridLines = [];
  const verticalGridLines = [];
  const xAxisLabels = [];
  const yAxisLabels = [];

  // Generate grid lines
  for (let i = gridStart.y; i <= gridEnd.y; i += gridSize) {
    horizontalGridLines.push(
      <line
        key={`h-grid-${i}`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        x1={gridStart.x}
        x2={gridEnd.x}
        y1={i}
        y2={i}
      />
    );
  }

  for (let i = gridStart.x; i <= gridEnd.x; i += gridSize) {
    verticalGridLines.push(
      <line
        key={`v-grid-${i}`}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        x1={i}
        x2={i}
        y1={gridStart.y}
        y2={gridEnd.y}
      />
    );
  }

  // Generate labels
  for (let i = Math.ceil(gridStart.x / labelInterval) * labelInterval; i <= gridEnd.x; i += labelInterval) {
    xAxisLabels.push(
      <text
        key={`grid-label-x-${i}`}
        fill={labelColor}
        fontSize={labelFontSize / zoom}
        textAnchor="middle"
        x={i}
        y={viewBox.y + labelFontSize / zoom}
      >
        {i + startPoint.x}
      </text>
    );
  }

  for (let i = Math.ceil(gridStart.y / labelInterval) * labelInterval; i <= gridEnd.y; i += labelInterval) {
    yAxisLabels.push(
      <text
        key={`grid-label-y-${i}`}
        fill={labelColor}
        fontSize={labelFontSize / zoom}
        x={viewBox.x + labelFontSize / zoom}
        y={i + labelFontSize / (2 * zoom)}
      >
        {i + startPoint.y}
      </text>
    );
  }

  return (
    <g className="no-print">
      {horizontalGridLines}
      {verticalGridLines}
      {xAxisLabels}
      {yAxisLabels}
    </g>
  );
}

interface ServerDrawingControlsProps {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
}

export function ServerDrawingControls({
  zoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
  onRecenter,
}: ServerDrawingControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 no-print">
      <Button
        variant="outline"
        size="icon"
        disabled={zoom >= maxZoom}
        title="Zoom in"
        onClick={onZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
        <span className="sr-only">Zoom in</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={zoom <= minZoom}
        title="Zoom out"
        onClick={onZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
        <span className="sr-only">Zoom out</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        title="Reset view"
        onClick={onRecenter}
      >
        <RotateCw className="h-4 w-4" />
        <span className="sr-only">Reset view</span>
      </Button>
    </div>
  );
}

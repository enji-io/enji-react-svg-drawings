'use client';

import type React from 'react';
import { useState } from 'react';
import { ServerDrawingGrid, ServerDrawingControls } from './server-drawing-canvas';
import type { Point } from '@/types/geometry';

interface DrawingCanvasProps {
  width?: number;
  height: number;
  gridSize?: number;
  labelInterval?: number;
  strokeColor?: string;
  strokeWidth?: number;
  labelColor?: string;
  labelFontSize?: number;
  className?: string;
  startPoint?: Point;
  children?: React.ReactNode;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width = 800, // pay attenation to parent container width
  height,
  gridSize = 10,
  labelInterval = 50,
  strokeColor = '#ddd',
  strokeWidth = 0.5,
  labelColor = '#999',
  labelFontSize = 8,
  className,
  startPoint = { x: 0, y: 0 },
  children,
}) => {
  const [zoom, setZoom] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialClickPos, setInitialClickPos] = useState({ x: 0, y: 0 });

  const minZoom = 0.3;
  const maxZoom = 2;
  const zoomStep = 0.25;

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + zoomStep, maxZoom));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - zoomStep, minZoom));
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    setInitialClickPos({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setDragOffset({
      x: e.clientX - initialClickPos.x,
      y: e.clientY - initialClickPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRecenter = () => {
    setZoom(1);
    setDragOffset({ x: 0, y: 0 });
  };

  // Calculate the scaled dimensions for the viewBox
  const viewBoxWidth = width / zoom;
  const viewBoxHeight = height / zoom;
  const viewBox = {
    x: -dragOffset.x / zoom,
    y: -dragOffset.y / zoom,
  };

  // Calculate grid boundaries based on viewBox
  const gridStart = {
    x: Math.floor(viewBox.x / gridSize) * gridSize,
    y: Math.floor(viewBox.y / gridSize) * gridSize,
  };
  const gridEnd = {
    x: Math.ceil((viewBox.x + viewBoxWidth) / gridSize) * gridSize,
    y: Math.ceil((viewBox.y + viewBoxHeight) / gridSize) * gridSize,
  };

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBoxWidth} ${viewBoxHeight}`}
        className={`${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        aria-label="Drawing canvas"
      >
        <title>Drawing canvas</title>
        <g>
          <ServerDrawingGrid
            gridStart={gridStart}
            gridEnd={gridEnd}
            gridSize={gridSize}
            labelInterval={labelInterval}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            labelColor={labelColor}
            labelFontSize={labelFontSize}
            viewBox={viewBox}
            zoom={zoom}
            startPoint={startPoint}
          />
          {children}
        </g>
      </svg>
      <ServerDrawingControls
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenter}
      />
    </div>
  );
};

export default DrawingCanvas;

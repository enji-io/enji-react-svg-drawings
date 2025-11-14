import React from 'react';

interface ArrowMarkerProps {
  id: string;
  fill?: string;
  markerWidth?: number;
  markerHeight?: number;
}

const ArrowMarker: React.FC<ArrowMarkerProps> = ({ id, fill = 'black', markerWidth = 6, markerHeight = 6 }) => {
  return (
    <>
      <marker
        id={`${id}-start`}
        markerHeight={markerHeight}
        markerWidth={markerWidth}
        orient="auto"
        refX="5"
        refY="5"
        viewBox="0 0 10 10"
      >
        <path
          d="M 10 0 L 0 5 L 10 10 z"
          fill={fill}
        />
      </marker>
      <marker
        id={`${id}-end`}
        markerHeight={markerHeight}
        markerWidth={markerWidth}
        orient="auto"
        refX="5"
        refY="5"
        viewBox="0 0 10 10"
      >
        <path
          d="M 0 0 L 10 5 L 0 10 z"
          fill={fill}
        />
      </marker>
    </>
  );
};

export default ArrowMarker;

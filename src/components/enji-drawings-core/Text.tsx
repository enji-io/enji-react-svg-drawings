import React from 'react';
import { Point } from '@/types/geometry';

interface TextProps {
  position: Point;
  children: React.ReactNode;
  fontSize?: number;
  fill?: string;
  textAnchor?: 'start' | 'middle' | 'end';
  transform?: string;
  className?: string;
  dominantBaseline?:
    | 'auto'
    | 'middle'
    | 'central'
    | 'hanging'
    | 'left'
    | 'right'
    | 'text-before-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'mathematical';
}

const Text: React.FC<TextProps> = ({
  position,
  children,
  fontSize = 12,
  fill = 'black',
  textAnchor = 'middle',
  transform,
  className,
  dominantBaseline = 'middle',
}) => {
  return (
    <text
      className={className}
      fill={fill}
      fontSize={fontSize}
      textAnchor={textAnchor}
      dominantBaseline={dominantBaseline}
      transform={transform}
      x={position.x}
      y={position.y}
    >
      {children}
    </text>
  );
};

export default Text;

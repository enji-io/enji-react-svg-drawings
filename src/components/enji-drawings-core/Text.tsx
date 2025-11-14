import type { ReactNode } from 'react';
import type { Point } from '@/types/geometry';

interface TextProps {
  position: Point;
  children: ReactNode;
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
    | 'text-before-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'mathematical';
}

const Text = ({
  position,
  children,
  fontSize = 12,
  fill = 'black',
  textAnchor = 'middle',
  transform,
  className,
  dominantBaseline = 'middle',
}: TextProps) => {
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

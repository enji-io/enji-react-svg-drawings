import React from 'react';
import { Point } from '@/types/geometry';
import RadiusAnnotation from './RadiusAnnotation';
import DimensionLine from './DimensionLine';
import { getNextArcLinePoints, getInitialBarPath, getInitialBarPoints } from './mathematics-points-bending';

interface SingleBendBarProps {
  position: Point;
  lengthA: number;
  lengthB: number;
  innerRadius: number;
  angle: number;
  switchFirstBend?: boolean;
  color?: string;
  rotation?: number;
  barThickness?: number;
  showRadius?: boolean;
  showDimensions?: boolean;
}

const SingleBendBar: React.FC<SingleBendBarProps> = ({
  position,
  lengthA,
  lengthB,
  innerRadius,
  angle,
  switchFirstBend = false,
  color = '#000',
  rotation = 0,
  barThickness = 3,
  showRadius = false,
  showDimensions = false,
}) => {
  if (angle < 0 || angle > 180) {
    throw new Error('Angle must be between 0 and 180 degrees');
  }

  if (rotation < 0 || rotation > 90) {
    throw new Error('Rotation must be between 0 and 90 degrees');
  }
  const offsetR = innerRadius + barThickness;
  const angleRad = (angle * Math.PI) / 180;

  // NOTE: the angle is taken between horizontal line and the first bar in the first quadrant
  const firstBarAngleRad = (rotation * Math.PI) / 180;

  const { firstBar, circleStartFirst, circleCenterFirst } = getInitialBarPoints(
    position,
    switchFirstBend,
    lengthA,
    innerRadius,
    barThickness,
    firstBarAngleRad
  );

  const { nextBar: secondBar } = getNextArcLinePoints(
    firstBar,
    switchFirstBend,
    false, // no next bend
    innerRadius,
    0, // no next radius
    lengthB,
    barThickness,
    angleRad,
    circleStartFirst,
    circleCenterFirst
  );

  return (
    <>
      <path
        d={getInitialBarPath(firstBar, secondBar, switchFirstBend, innerRadius, offsetR)}
        fill="white"
        stroke={color}
        strokeWidth={1}
      />
      {showRadius && (
        <RadiusAnnotation
          center={{
            x: circleCenterFirst.x,
            y: circleCenterFirst.y,
          }}
          radius={innerRadius}
          color={color}
        />
      )}

      {showDimensions && (
        <>
          {/* Length A dimension */}
          <DimensionLine
            start={{ x: firstBar.startOffset.x, y: firstBar.startOffset.y }}
            end={{ x: firstBar.endOffset.x, y: firstBar.endOffset.y }}
            label={`A=${lengthA}`}
          />

          {/* Length B dimension */}
          <DimensionLine
            switchPosition
            start={{ x: secondBar.startOffset.x, y: secondBar.startOffset.y }}
            end={{ x: secondBar.endOffset.x, y: secondBar.endOffset.y }}
            label={`B=${lengthB}`}
          />
        </>
      )}
    </>
  );
};

export default SingleBendBar;

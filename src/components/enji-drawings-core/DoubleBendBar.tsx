import React from 'react';
import { Point } from '@/types/geometry';
import RadiusAnnotation from './RadiusAnnotation';
import DimensionLine from './DimensionLine';
import {
  getInitialBarPoints,
  getNextArcLinePoints,
  getInitialBarPath,
  getFinalBendPath,
} from './mathematics-points-bending';

interface DoubleBendBarProps {
  position: Point;
  barThickness: number;
  lengthA: number;
  lengthB: number;
  lengthC: number;
  angle1: number;
  angle2: number;
  firstInnerRadius: number;
  secondInnerRadius: number;
  switchFirstBend?: boolean;
  switchSecondBend?: boolean;
  color?: string;
  rotation?: number;
  showRadius?: boolean;
  showDimensions?: boolean;
}

const DoubleBendBar: React.FC<DoubleBendBarProps> = ({
  position,
  barThickness,
  lengthA,
  lengthB,
  lengthC,
  angle1,
  angle2,
  firstInnerRadius,
  secondInnerRadius,
  switchFirstBend = false,
  switchSecondBend = false,
  color = '#000',
  rotation = 0,
  showRadius = false,
  showDimensions = false,
}) => {
  if (angle1 < 0 || angle1 > 180 || angle2 < 0 || angle2 > 180) {
    throw new Error('Angles must be between 0 and 180 degrees');
  }

  if (rotation < 0 || rotation > 90) {
    throw new Error('Rotation must be between 0 and 90 degrees');
  }

  const angle1Rad = (angle1 * Math.PI) / 180;
  const angle2Rad = (angle2 * Math.PI) / 180;
  const firstOffset = firstInnerRadius + barThickness;

  const firstBarAngleRad = (rotation * Math.PI) / 180;

  const { firstBar, circleCenterFirst, circleStartFirst } = getInitialBarPoints(
    position,
    switchFirstBend,
    lengthA,
    firstInnerRadius,
    barThickness,
    firstBarAngleRad
  );

  const secondOffset = secondInnerRadius + barThickness;

  const {
    nextBar: secondBar,
    nextCircleCenter: circleCenterSecond,
    nextCircleStart: circleStartSecond,
  } = getNextArcLinePoints(
    firstBar,
    switchFirstBend,
    switchSecondBend,
    firstInnerRadius,
    secondInnerRadius,
    lengthB,
    barThickness,
    angle1Rad,
    circleStartFirst,
    circleCenterFirst
  );

  const { nextBar: thirdBar } = getNextArcLinePoints(
    secondBar,
    switchSecondBend,
    false, // no next bend
    secondInnerRadius,
    0, // no next radius
    lengthC,
    barThickness,
    angle2Rad,
    circleStartSecond,
    circleCenterSecond
  );

  return (
    <>
      {/* First Path - First Bar and Connection to Second Bar */}
      <path
        d={getInitialBarPath(firstBar, secondBar, switchFirstBend, firstInnerRadius, firstOffset)}
        fill="white"
        stroke={color}
        strokeWidth={1}
      />

      {/* Second Path - Final Bend Plus C Bar */}
      <path
        d={getFinalBendPath(secondBar, thirdBar, switchSecondBend, secondInnerRadius, secondOffset)}
        fill="white"
        stroke={color}
        strokeWidth={1}
        fillRule="nonzero"
      />

      {showRadius && (
        <>
          <RadiusAnnotation
            center={circleCenterFirst}
            radius={firstInnerRadius}
            color={color}
          />
          <RadiusAnnotation
            center={circleCenterSecond}
            radius={secondInnerRadius}
            color={color}
          />
        </>
      )}
      {showDimensions && (
        <>
          {/* Length A dimension */}
          <DimensionLine
            switchPosition
            start={{ x: firstBar.start.x, y: firstBar.start.y }}
            end={{ x: firstBar.end.x, y: firstBar.end.y }}
            label={`A=${lengthA}`}
          />

          {/* Length B dimension */}
          <DimensionLine
            start={{ x: secondBar.startOffset.x, y: secondBar.startOffset.y }}
            end={{ x: secondBar.endOffset.x, y: secondBar.endOffset.y }}
            label={`B=${lengthB}`}
          />

          {/* Length C dimension */}
          <DimensionLine
            switchPosition
            start={{ x: thirdBar.startOffset.x, y: thirdBar.startOffset.y }}
            end={{ x: thirdBar.endOffset.x, y: thirdBar.endOffset.y }}
            label={`C=${lengthC}`}
          />
        </>
      )}
    </>
  );
};

export default DoubleBendBar;

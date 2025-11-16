import type React from 'react';
import type { Point } from '@/types/geometry';
import RadiusAnnotation from './RadiusAnnotation';
import DimensionLine from './DimensionLine';
import {
  getInitialBarPoints,
  getNextArcLinePoints,
  getInitialBarPath,
  getFinalBendPath,
} from './mathematics-points-bending';

interface TripleBendBarProps {
  position: Point;
  lengthA: number;
  lengthB: number;
  lengthC: number;
  lengthD: number;
  angle1: number;
  angle2: number;
  angle3: number;
  firstInnerRadius: number;
  secondInnerRadius: number;
  thirdInnerRadius: number;
  switchFirstBend?: boolean;
  switchSecondBend?: boolean;
  switchThirdBend?: boolean;
  color?: string;
  rotation?: number;
  barThickness?: number;
  showRadius?: boolean;
  showDimensions?: boolean;
}

const TripleBendBar: React.FC<TripleBendBarProps> = ({
  position,
  lengthA,
  lengthB,
  lengthC,
  lengthD,
  angle1,
  angle2,
  angle3,
  firstInnerRadius,
  secondInnerRadius,
  thirdInnerRadius,
  switchFirstBend = false,
  switchSecondBend = false,
  switchThirdBend = false,
  color = '#000',
  rotation = 0,
  barThickness = 3,
  showRadius = false,
  showDimensions = false,
}) => {
  if (angle1 < 0 || angle1 > 180 || angle2 < 0 || angle2 > 180 || angle3 < 0 || angle3 > 180) {
    throw new Error('Angles must be between 0 and 180 degrees');
  }

  const angle1Rad = (angle1 * Math.PI) / 180;
  const angle2Rad = (angle2 * Math.PI) / 180;
  const angle3Rad = (angle3 * Math.PI) / 180;

  const firstBarAngleRad = (rotation * Math.PI) / 180;

  const firstOffsetR = firstInnerRadius + barThickness;
  const { firstBar, circleCenterFirst, circleStartFirst } = getInitialBarPoints(
    position,
    switchFirstBend,
    lengthA,
    firstInnerRadius,
    barThickness,
    firstBarAngleRad
  );

  const secondOffsetR = secondInnerRadius + barThickness;
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

  const thirdOffsetR = thirdInnerRadius + barThickness;
  const {
    nextBar: thirdBar,
    nextCircleCenter: circleCenterThird,
    nextCircleStart: circleStartThird,
  } = getNextArcLinePoints(
    secondBar,
    switchSecondBend,
    switchThirdBend,
    secondInnerRadius,
    thirdInnerRadius,
    lengthC,
    barThickness,
    angle2Rad,
    circleStartSecond,
    circleCenterSecond
  );

  const { nextBar: fourthBar } = getNextArcLinePoints(
    thirdBar,
    switchThirdBend,
    false, // no next bend
    thirdInnerRadius,
    0,
    lengthD,
    barThickness,
    angle3Rad,
    circleStartThird,
    circleCenterThird
  );
  return (
    <>
      {/* First Path - First Bar and Connection to Second Bar */}
      <path
        d={getInitialBarPath(firstBar, secondBar, switchFirstBend, firstInnerRadius, firstOffsetR)}
        fill="white"
        stroke={color}
        strokeWidth={1}
      />

      {/* Second Path - Second Bend Plus C Bar */}
      <path
        d={getFinalBendPath(secondBar, thirdBar, switchSecondBend, secondInnerRadius, secondOffsetR)}
        fill="white"
        stroke={color}
        strokeWidth={1}
        fillRule="nonzero"
      />

      {/* Third Path - Third Bend Plus D Bar */}
      <path
        d={getFinalBendPath(thirdBar, fourthBar, switchThirdBend, thirdInnerRadius, thirdOffsetR)}
        fill="white"
        stroke={color}
        strokeWidth={1}
        fillRule="nonzero"
      />
      {showRadius && (
        <>
          <RadiusAnnotation center={circleCenterFirst} radius={firstInnerRadius} color={color} />
          <RadiusAnnotation center={circleCenterSecond} radius={secondInnerRadius} color={color} />
          <RadiusAnnotation center={circleCenterThird} radius={thirdInnerRadius} color={color} />
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
          <DimensionLine
            switchPosition
            start={{ x: fourthBar.startOffset.x, y: fourthBar.startOffset.y }}
            end={{ x: fourthBar.endOffset.x, y: fourthBar.endOffset.y }}
            label={`D=${lengthD}`}
          />
        </>
      )}
    </>
  );
};

export default TripleBendBar;

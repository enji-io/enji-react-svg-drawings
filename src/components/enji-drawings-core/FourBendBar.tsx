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

interface FourBendBarProps {
  position: Point;
  lengthA: number;
  lengthB: number;
  lengthC: number;
  lengthD: number;
  lengthE: number;
  angle1: number;
  angle2: number;
  angle3: number;
  angle4: number;
  firstInnerRadius: number;
  secondInnerRadius: number;
  thirdInnerRadius: number;
  fourthInnerRadius: number;
  switchFirstBend?: boolean;
  switchSecondBend?: boolean;
  switchThirdBend?: boolean;
  switchFourthBend?: boolean;
  color?: string;
  rotation?: number;
  barThickness?: number;
  showRadius?: boolean;
  showDimensions?: boolean;
}

const FourBendBar: React.FC<FourBendBarProps> = ({
  position,
  lengthA,
  lengthB,
  lengthC,
  lengthD,
  lengthE,
  angle1,
  angle2,
  angle3,
  angle4,
  firstInnerRadius,
  secondInnerRadius,
  thirdInnerRadius,
  fourthInnerRadius,
  switchFirstBend = false,
  switchSecondBend = false,
  switchThirdBend = false,
  switchFourthBend = false,
  color = '#000',
  rotation = 0,
  barThickness = 3,
  showRadius = false,
  showDimensions = false,
}) => {
  if (
    angle1 < 0 ||
    angle1 > 180 ||
    angle2 < 0 ||
    angle2 > 180 ||
    angle3 < 0 ||
    angle3 > 180 ||
    angle4 < 0 ||
    angle4 > 180
  ) {
    throw new Error('Angles must be between 0 and 180 degrees');
  }

  const angle1Rad = (angle1 * Math.PI) / 180;
  const angle2Rad = (angle2 * Math.PI) / 180;
  const angle3Rad = (angle3 * Math.PI) / 180;
  const angle4Rad = (angle4 * Math.PI) / 180;
  const firstOffsetR = firstInnerRadius + barThickness;
  const secondOffsetR = secondInnerRadius + barThickness;
  const thirdOffsetR = thirdInnerRadius + barThickness;
  const fourthOffsetR = fourthInnerRadius + barThickness;
  const firstBarAngleRad = (rotation * Math.PI) / 180;

  const { firstBar, circleCenterFirst, circleStartFirst } = getInitialBarPoints(
    position,
    switchFirstBend,
    lengthA,
    firstInnerRadius,
    barThickness,
    firstBarAngleRad
  );

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

  const {
    nextBar: fourthBar,
    nextCircleCenter: circleCenterFourth,
    nextCircleStart: circleStartFourth,
  } = getNextArcLinePoints(
    thirdBar,
    switchThirdBend,
    switchFourthBend,
    thirdInnerRadius,
    fourthInnerRadius,
    lengthD,
    barThickness,
    angle3Rad,
    circleStartThird,
    circleCenterThird
  );

  const { nextBar: fifthBar } = getNextArcLinePoints(
    fourthBar,
    switchFourthBend,
    false, // no next bend
    fourthInnerRadius,
    0, // no next radius
    lengthE,
    barThickness,
    angle4Rad,
    circleStartFourth,
    circleCenterFourth
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

      {/* Fourth Path - Fourth Bend Plus E Bar */}
      <path
        d={getFinalBendPath(fourthBar, fifthBar, switchFourthBend, fourthInnerRadius, fourthOffsetR)}
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
          <RadiusAnnotation center={circleCenterFourth} radius={fourthInnerRadius} color={color} />
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

          {/* Length D dimension */}
          <DimensionLine
            start={{ x: fourthBar.startOffset.x, y: fourthBar.startOffset.y }}
            end={{ x: fourthBar.endOffset.x, y: fourthBar.endOffset.y }}
            label={`D=${lengthD}`}
          />

          {/* Length E dimension */}
          <DimensionLine
            switchPosition
            start={{ x: fifthBar.startOffset.x, y: fifthBar.startOffset.y }}
            end={{ x: fifthBar.endOffset.x, y: fifthBar.endOffset.y }}
            label={`E=${lengthE}`}
          />
        </>
      )}
    </>
  );
};

export default FourBendBar;

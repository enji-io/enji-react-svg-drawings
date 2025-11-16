import type { Bar, Point } from '../../types/geometry';

export const getInitialBarPoints = (
  start: Point,
  switchFirstBend: boolean,
  lengthA: number,
  bendRadius: number,
  barThickness: number,
  barAngle: number
) => {
  // Calculate x and y components based on barAngle (in radians)
  // For first quadrant, x component is positive and y component is positive
  const dx = lengthA * Math.sin(barAngle);
  const dy = lengthA * Math.cos(barAngle);

  // Calculate the perpendicular direction for the bar thickness
  // Perpendicular vector is (-sin(angle), cos(angle))
  const offsetX = barThickness * Math.sin(barAngle + Math.PI / 2);
  const offsetY = barThickness * Math.cos(barAngle + Math.PI / 2);

  const firstBar = {
    startOffset: {
      x: start.x,
      y: start.y,
    },
    endOffset: {
      x: start.x - dx,
      y: start.y + dy,
    },
    start: {
      x: start.x - offsetX,
      y: start.y + offsetY,
    },
    end: {
      x: start.x - dx - offsetX,
      y: start.y + dy + offsetY,
    },
  };

  const circleStartFirst = switchFirstBend ? firstBar.start : firstBar.startOffset;
  const adjacentToStartPoint = switchFirstBend ? firstBar.startOffset : firstBar.start;

  const circleCenterDirectionX = circleStartFirst.x > adjacentToStartPoint.x ? 1 : -1;
  const circleCenterDirectionY = circleStartFirst.y > adjacentToStartPoint.y ? 1 : -1;

  const circleCenterFirst = {
    x: circleStartFirst.x + bendRadius * circleCenterDirectionX * Math.cos(barAngle),
    y: circleStartFirst.y + bendRadius * circleCenterDirectionY * Math.sin(barAngle),
  };

  return { firstBar, circleCenterFirst, circleStartFirst, adjacentToStartPoint };
};

export const getNextArcLinePoints = (
  prevBar: Bar,
  switchBend: boolean,
  switchNextBend: boolean,
  prevBendRadius: number,
  nextBendRadius: number,
  nextBarLength: number,
  barThickness: number,
  angleArc: number,
  prevCircleStart: Point,
  prevCircleCenter: Point
) => {
  // Calculate the angle to the next point based on the bend direction
  const nextPointDirection = prevCircleStart.x < prevBar.end.x ? (switchBend ? -1 : 1) : switchBend ? -1 : 1;

  // Calculate vector from circle center to circle start
  const centerToStartX = prevCircleStart.x - prevCircleCenter.x;
  const centerToStartY = prevCircleStart.y - prevCircleCenter.y;

  // Get the length of this vector (should be R, but we calculate for accuracy)
  const centerToStartLength = Math.sqrt(centerToStartX ** 2 + centerToStartY ** 2);

  // Normalize the vector
  const normalizedCenterToStartX = centerToStartX / centerToStartLength;
  const normalizedCenterToStartY = centerToStartY / centerToStartLength;

  // Calculate the rotation angle in radians
  const rotationAngle = nextPointDirection * angleArc;

  // Rotate the normalized vector by the rotation angle
  // Rotation matrix: [cos(θ), -sin(θ); sin(θ), cos(θ)]
  const rotatedX =
    normalizedCenterToStartX * Math.cos(rotationAngle) - normalizedCenterToStartY * Math.sin(rotationAngle);
  const rotatedY =
    normalizedCenterToStartX * Math.sin(rotationAngle) + normalizedCenterToStartY * Math.cos(rotationAngle);

  // Scale the rotated vector by radius R
  const scaledRotatedX = rotatedX * prevBendRadius;
  const scaledRotatedY = rotatedY * prevBendRadius;

  // Calculate the next bar start point using the rotated vector
  let nextBarStart: Point = {
    x: prevCircleCenter.x + scaledRotatedX,
    y: prevCircleCenter.y + scaledRotatedY,
  };

  // Calculate the offset point by extending along the radius from circle center
  let nextBarStartOffset: Point = {
    x: nextBarStart.x + ((nextBarStart.x - prevCircleCenter.x) / prevBendRadius) * barThickness,
    y: nextBarStart.y + ((nextBarStart.y - prevCircleCenter.y) / prevBendRadius) * barThickness,
  };

  if (switchBend) {
    const temp = nextBarStart;
    nextBarStart = nextBarStartOffset;
    nextBarStartOffset = temp;
  }

  // Calculate the vector from circle center to nextBarStart
  const centerToStartVectorX = nextBarStart.x - prevCircleCenter.x;
  const centerToStartVectorY = nextBarStart.y - prevCircleCenter.y;

  // Calculate the angle of this vector
  const centerToStartAngle = Math.atan2(centerToStartVectorY, centerToStartVectorX);

  // Determine the direction - for angles 0-180, we want to go perpendicular
  // Whether we go clockwise or counterclockwise depends on the nextPointDirection
  const nextBarAngle = centerToStartAngle + (nextPointDirection * Math.PI) / 2;

  const nextBar: Bar = {
    startOffset: {
      x: nextBarStart.x,
      y: nextBarStart.y,
    },
    endOffset: {
      x: nextBarStart.x + nextBarLength * Math.cos(nextBarAngle),
      y: nextBarStart.y + nextBarLength * Math.sin(nextBarAngle),
    },
    start: {
      x: nextBarStartOffset.x,
      y: nextBarStartOffset.y,
    },
    end: {
      x: nextBarStartOffset.x + nextBarLength * Math.cos(nextBarAngle),
      y: nextBarStartOffset.y + nextBarLength * Math.sin(nextBarAngle),
    },
  };

  // Calculate ALL for next arc and bar
  let nextCircleStart: Point;
  let adjacentToNextStartPoint: Point;
  if (switchNextBend) {
    nextCircleStart = {
      x: nextBar.end.x,
      y: nextBar.end.y,
    };
    adjacentToNextStartPoint = {
      x: nextBar.endOffset.x,
      y: nextBar.endOffset.y,
    };
  } else {
    nextCircleStart = {
      x: nextBar.endOffset.x,
      y: nextBar.endOffset.y,
    };
    adjacentToNextStartPoint = {
      x: nextBar.end.x,
      y: nextBar.end.y,
    };
  }

  // Calculate the vector from nextCircleStart to adjacentToNextStartPoint
  const vectorX = adjacentToNextStartPoint.x - nextCircleStart.x;
  const vectorY = adjacentToNextStartPoint.y - nextCircleStart.y;

  // Normalize the vector
  const vectorLength = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
  const normalizedVectorX = vectorX / vectorLength;
  const normalizedVectorY = vectorY / vectorLength;

  // Instead of rotating, we extend in the same direction (parallel)
  // Determine the direction multiplier to ensure we're extending in the right direction
  const directionMultiplier = -1; // Extend in opposite direction of the vector

  // Calculate the circle center by moving R units in the parallel direction
  const nextCircleCenter = {
    x: nextCircleStart.x + nextBendRadius * directionMultiplier * normalizedVectorX,
    y: nextCircleStart.y + nextBendRadius * directionMultiplier * normalizedVectorY,
  };
  return { nextCircleStart, nextCircleCenter, nextBar };
};

export const getInitialBarPath = (
  firstBar: Bar,
  secondBar: Bar,
  switchFirstBend: boolean,
  R: number,
  offsetR: number
) => {
  return `
    M ${firstBar.startOffset.x} ${firstBar.startOffset.y}
    L ${firstBar.endOffset.x} ${firstBar.endOffset.y}
    L ${firstBar.end.x} ${firstBar.end.y}
    L ${firstBar.start.x} ${firstBar.start.y}
    A ${switchFirstBend ? R : offsetR} ${switchFirstBend ? R : offsetR} 0 0 ${switchFirstBend ? 0 : 1} ${secondBar.start.x} ${secondBar.start.y}
    L ${secondBar.end.x} ${secondBar.end.y}
    L ${secondBar.endOffset.x} ${secondBar.endOffset.y}
    L ${secondBar.startOffset.x} ${secondBar.startOffset.y}
    A ${switchFirstBend ? offsetR : R} ${switchFirstBend ? offsetR : R} 0 0 ${switchFirstBend ? 1 : 0} ${firstBar.startOffset.x} ${firstBar.startOffset.y}
  `;
};

export const getIntermediateBendPath = (
  prevBar: Bar,
  bar: Bar,
  switchFirstBend: boolean,
  switchSecondBend: boolean,
  R: number,
  offsetR: number
): string => {
  return `
    M ${prevBar.endOffset.x} ${prevBar.endOffset.y}
    A ${offsetR} ${offsetR} 0 0 1 ${bar.startOffset.x} ${bar.startOffset.y}
    L ${bar.endOffset.x} ${bar.endOffset.y}
    L ${bar.end.x} ${bar.end.y}
    L ${bar.start.x} ${bar.start.y}
    A ${R} ${R} 0 0 0 ${prevBar.end.x} ${prevBar.end.y}
  `;
};

export const getFinalBendPath = (prevBar: Bar, bar: Bar, switchBend: boolean, R: number, offsetR: number): string => {
  // Determine the correct starting point based on bend switches
  const startX = prevBar.endOffset.x;
  const startY = prevBar.endOffset.y;

  // Determine the arc flag for the SVG path
  // This logic handles special cases for extreme angles
  const arcFlag1 = switchBend ? 0 : 1;
  const arcFlag2 = switchBend ? 1 : 0;

  // offset radius or normal radius
  const radius1 = switchBend ? R : offsetR;
  const radius2 = switchBend ? offsetR : R;
  // Calculate the endpoint for the inner arc (used for the second arc)
  const endX = startX === prevBar.end.x ? prevBar.endOffset.x : prevBar.end.x;
  const endY = startY === prevBar.end.y ? prevBar.endOffset.y : prevBar.end.y;

  return `
    M ${startX} ${startY}
    A ${radius2} ${radius2} 0 0 ${arcFlag1} ${bar.startOffset.x} ${bar.startOffset.y}
    L ${bar.endOffset.x} ${bar.endOffset.y}
    L ${bar.end.x} ${bar.end.y}
    L ${bar.start.x} ${bar.start.y}
    A ${radius1} ${radius1} 0 0 ${arcFlag2} ${endX} ${endY}
  `;
};

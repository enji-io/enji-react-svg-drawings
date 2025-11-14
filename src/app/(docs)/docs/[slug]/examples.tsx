import {
  Text,
  RectangularOutline,
  DimensionLine,
  ReferencePoint,
  StraightBar,
  FullRectangleBar,
  ArrowMarker,
  RebarRow,
  SingleBendBar,
  DoubleBendBar,
  TripleBendBar,
  FourBendBar,
} from '@enji-drawings-core';
import { ReactElement } from 'react';

interface Example {
  demo: ReactElement;
}

type Examples = {
  [key: string]: Example;
};

export const examples: Examples = {
  Text: {
    demo: (
      <>
        <Text
          position={{ x: 100, y: 100 }}
          fontSize={12}
        >
          Regular Text
        </Text>

        <Text
          position={{ x: 100, y: 150 }}
          fontSize={16}
          fill="blue"
        >
          Blue Larger Text
        </Text>

        <Text
          position={{ x: 100, y: 200 }}
          fontSize={14}
          textAnchor="middle"
        >
          Center Aligned Text
        </Text>

        <Text
          position={{ x: 100, y: 250 }}
          fontSize={12}
          transform="rotate(-45 100,250)"
        >
          Rotated Text
        </Text>
      </>
    ),
  },
  RectangularOutline: {
    demo: (
      <>
        <RectangularOutline
          position={{ x: 100, y: 100 }}
          width={200}
          height={150}
          hatch="none"
        />

        <RectangularOutline
          position={{ x: 400, y: 100 }}
          width={200}
          height={150}
          hatch="concrete"
        />

        <RectangularOutline
          position={{ x: 100, y: 300 }}
          width={200}
          height={150}
          strokeColor="blue"
          strokeWidth={1}
        />
      </>
    ),
  },
  DimensionLine: {
    demo: (
      <>
        <DimensionLine
          start={{ x: 100, y: 100 }}
          end={{ x: 300, y: 100 }}
          label="200"
        />
        <DimensionLine
          switchPosition
          start={{ x: 100, y: 150 }}
          end={{ x: 300, y: 150 }}
          label="200"
        />
        <DimensionLine
          start={{ x: 500, y: 100 }}
          end={{ x: 400, y: 300 }}
          label="200"
        />
        <DimensionLine
          start={{ x: 100, y: 200 }}
          end={{ x: 200, y: 400 }}
          label="200"
        />
        <DimensionLine
          switchPosition
          start={{ x: 600, y: 200 }}
          end={{ x: 500, y: 400 }}
          label="200"
        />
        <DimensionLine
          switchPosition
          start={{ x: 200, y: 300 }}
          end={{ x: 300, y: 500 }}
          label="200"
        />{' '}
        <DimensionLine
          switchPosition
          start={{ x: 700, y: 200 }}
          end={{ x: 700, y: 400 }}
          label="200"
        />
        <DimensionLine
          start={{ x: 650, y: 300 }}
          end={{ x: 650, y: 500 }}
          label="200"
        />
      </>
    ),
  },
  ReferencePoint: {
    demo: (
      <>
        <ReferencePoint position={{ x: 111, y: 111 }} />
        <ReferencePoint position={{ x: 211, y: 211 }} />
        <ReferencePoint position={{ x: 254, y: 315 }} />
      </>
    ),
  },
  FullRectangleBar: {
    demo: (
      <>
        <FullRectangleBar
          position={{ x: 100, y: 100 }}
          width={200}
          height={300}
          stirrupBendingRadius={32}
          thickness={8}
        />

        <FullRectangleBar
          position={{ x: 400, y: 100 }}
          width={100}
          height={200}
          stirrupBendingRadius={12}
          thickness={6}
          color="green"
        />
      </>
    ),
  },
  ArrowMarker: {
    demo: (
      <>
        <ArrowMarker id="example-arrow" />
        <line
          x1={100}
          y1={100}
          x2={300}
          y2={100}
          stroke="black"
          strokeWidth={1}
          markerEnd="url(#example-arrow-end)"
          markerStart="url(#example-arrow-start)"
        />
        <line
          x1={100}
          y1={150}
          x2={300}
          y2={150}
          stroke="blue"
          strokeWidth={1}
          markerEnd="url(#example-arrow-end)"
          markerStart="url(#example-arrow-start)"
        />
        <line
          x1={100}
          y1={200}
          x2={300}
          y2={200}
          stroke="red"
          strokeWidth={1}
          markerEnd="url(#example-arrow-end)"
          markerStart="url(#example-arrow-start)"
        />
      </>
    ),
  },
  RebarRow: {
    demo: (
      <>
        <RebarRow
          position={{ x: 100, y: 100 }}
          width={300}
          cover={25}
          rebarCount={5}
          rebarDiameter={20}
          stirrupBendingRadius={32}
        />

        <RebarRow
          position={{ x: 100, y: 200 }}
          width={300}
          cover={30}
          rebarCount={3}
          rebarDiameter={25}
          stirrupBendingRadius={32}
        />

        <RebarRow
          position={{ x: 100, y: 300 }}
          width={300}
          cover={40}
          rebarCount={4}
          rebarDiameter={16}
          stirrupBendingRadius={24}
        />
      </>
    ),
  },
  DrawingCanvas: {
    demo: (
      <>
        <RectangularOutline
          position={{ x: 100, y: 100 }}
          width={200}
          height={150}
          hatch="concrete"
        />

        <DimensionLine
          switchPosition
          start={{ x: 100, y: 300 }}
          end={{ x: 300, y: 300 }}
          label="200"
        />

        <ReferencePoint
          position={{ x: 200, y: 175 }}
          label={{ x: 'Center', y: 'Center' }}
        />

        <Text
          position={{ x: 350, y: 80 }}
          fontSize={14}
          textAnchor="middle"
        >
          View only canvas with grid
        </Text>
      </>
    ),
  },
  StraightBar: {
    demo: (
      <>
        <StraightBar
          position={{ x: 100, y: 100 }}
          length={200}
          diameter={25}
        />
        <StraightBar
          position={{ x: 100, y: 200 }}
          length={300}
          diameter={25}
          color="red"
        />
        <StraightBar
          position={{ x: 100, y: 300 }}
          length={400}
          diameter={50}
          color="blue"
          rotation={-30}
        />
      </>
    ),
  },
  SingleBendBar: {
    demo: (
      <>
        <ReferencePoint position={{ x: 80, y: 170 }} />
        <SingleBendBar
          rotation={0}
          angle={45}
          position={{ x: 80, y: 170 }}
          lengthA={200}
          lengthB={100}
          innerRadius={50}
          barThickness={10}
        />
        <ReferencePoint position={{ x: 300, y: 100 }} />
        <SingleBendBar
          switchFirstBend
          showRadius
          angle={180}
          position={{ x: 300, y: 100 }}
          lengthA={200}
          lengthB={100}
          innerRadius={50}
          barThickness={10}
        />

        <ReferencePoint position={{ x: 350, y: 150 }} />
        <SingleBendBar
          showRadius
          rotation={0}
          angle={90}
          position={{ x: 350, y: 150 }}
          lengthA={200}
          lengthB={100}
          innerRadius={20}
          barThickness={10}
        />
        <SingleBendBar
          showRadius
          showDimensions
          switchFirstBend
          rotation={90}
          angle={135}
          position={{ x: 650, y: 350 }}
          lengthA={200}
          lengthB={100}
          innerRadius={80}
          barThickness={10}
        />
      </>
    ),
  },
  DoubleBendBar: {
    demo: (
      <>
        <ReferencePoint position={{ x: 100, y: 100 }} />
        <DoubleBendBar
          showRadius
          showDimensions
          position={{ x: 100, y: 100 }}
          lengthA={100}
          lengthB={50}
          lengthC={100}
          angle1={90}
          angle2={90}
          barThickness={6}
          firstInnerRadius={20}
          secondInnerRadius={15}
        />
        <DoubleBendBar
          showRadius
          showDimensions
          switchFirstBend
          position={{ x: 320, y: 350 }}
          lengthA={100}
          lengthB={50}
          lengthC={100}
          angle1={90}
          angle2={45}
          barThickness={20}
          firstInnerRadius={20}
          secondInnerRadius={15}
        />
        <DoubleBendBar
          showRadius
          showDimensions
          switchFirstBend
          switchSecondBend
          position={{ x: 500, y: 50 }}
          lengthA={100}
          lengthB={100}
          lengthC={100}
          angle1={90}
          angle2={130}
          barThickness={20}
          firstInnerRadius={20}
          secondInnerRadius={15}
        />
        <DoubleBendBar
          showRadius
          showDimensions
          switchSecondBend
          position={{ x: 400, y: 400 }}
          lengthA={100}
          lengthB={100}
          lengthC={100}
          angle1={80}
          angle2={180}
          barThickness={12}
          firstInnerRadius={20}
          secondInnerRadius={15}
        />
        <DoubleBendBar
          showRadius
          switchSecondBend
          position={{ x: 650, y: 150 }}
          lengthA={100}
          lengthB={100}
          lengthC={100}
          angle1={0}
          angle2={0}
          barThickness={20}
          firstInnerRadius={20}
          secondInnerRadius={15}
        />
        <DoubleBendBar
          showRadius
          rotation={0}
          position={{ x: 600, y: 350 }}
          lengthA={100}
          lengthB={100}
          lengthC={100}
          angle1={180}
          angle2={90}
          barThickness={12}
          firstInnerRadius={20}
          secondInnerRadius={15}
        />
      </>
    ),
  },
  TripleBendBar: {
    demo: (
      <>
        <ReferencePoint position={{ x: 100, y: 100 }} />
        <TripleBendBar
          showRadius
          showDimensions
          position={{ x: 100, y: 100 }}
          lengthA={100}
          lengthB={50}
          lengthC={200}
          lengthD={50}
          angle1={90}
          angle2={90}
          angle3={180}
          barThickness={6}
          firstInnerRadius={20}
          secondInnerRadius={15}
          thirdInnerRadius={10}
        />
        <TripleBendBar
          showRadius
          position={{ x: 250, y: 350 }}
          lengthA={100}
          lengthB={50}
          lengthC={100}
          lengthD={50}
          angle1={120}
          angle2={90}
          angle3={120}
          barThickness={6}
          firstInnerRadius={20}
          secondInnerRadius={15}
          thirdInnerRadius={10}
        />
        <TripleBendBar
          showRadius
          showDimensions
          switchFirstBend
          position={{ x: 450, y: 300 }}
          lengthA={100}
          lengthB={50}
          lengthC={100}
          lengthD={50}
          angle1={45}
          angle2={45}
          angle3={45}
          barThickness={6}
          firstInnerRadius={20}
          secondInnerRadius={15}
          thirdInnerRadius={10}
        />
        <ReferencePoint position={{ x: 500, y: 300 }} />
        <TripleBendBar
          showDimensions
          showRadius
          rotation={0}
          position={{ x: 500, y: 300 }}
          lengthA={77}
          lengthB={50}
          lengthC={100}
          lengthD={50}
          angle1={45}
          angle2={45}
          angle3={45}
          barThickness={6}
          firstInnerRadius={20}
          secondInnerRadius={15}
          thirdInnerRadius={10}
        />
      </>
    ),
  },
  FourBendBar: {
    demo: (
      <>
        <ReferencePoint position={{ x: 100, y: 300 }} />
        <FourBendBar
          showRadius
          showDimensions
          switchSecondBend
          switchFourthBend
          rotation={0}
          position={{ x: 100, y: 300 }}
          lengthA={40}
          lengthB={60}
          lengthC={100}
          lengthD={100}
          lengthE={100}
          angle1={90}
          angle2={90}
          angle3={90}
          angle4={90}
          barThickness={10}
          firstInnerRadius={20}
          secondInnerRadius={15}
          thirdInnerRadius={10}
          fourthInnerRadius={25}
        />
        <ReferencePoint position={{ x: 300, y: 300 }} />
        <FourBendBar
          showRadius
          showDimensions
          switchSecondBend
          switchThirdBend
          rotation={90}
          position={{ x: 300, y: 300 }}
          lengthA={40}
          lengthB={60}
          lengthC={100}
          lengthD={100}
          lengthE={100}
          angle1={90}
          angle2={90}
          angle3={90}
          angle4={90}
          barThickness={10}
          firstInnerRadius={20}
          secondInnerRadius={15}
          thirdInnerRadius={10}
          fourthInnerRadius={25}
        />
      </>
    ),
  },
};

'use client';

import {
  RectangularReinforcedConcreteSection,
  type RectangularReinforcedConcreteSectionProps,
} from '@/features/rectangular-section/components/RectangularSectionRC';
import { RectangularSectionSettings } from '@/components/RectangularSectionSettings';
import { PrintOptions } from '@/components/PrintOptions';
import { DrawingCanvas } from '@enji-drawings-core';
import { useRef, useState, useEffect } from 'react';

export default function RectangularRCPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [props, setProps] = useState<RectangularReinforcedConcreteSectionProps>({
    width: 300,
    height: 400,
    cover: 25,
    bottomRebarDiameter: 12,
    bottomRebarCount: 3,
    topRebarDiameter: 8,
    topRebarCount: 2,
    stirrupThickness: 8,
    stirrupSpacing: 150,
    stirrupBendingRadius: 32, // initial value to be revaluated in useEffect
    concreteGrade: 'C25/30',
    rebarGrade: 'B500B',
  });

  // Ensure stirrupBendingRadius is always 4 times stirrupThickness
  useEffect(() => {
    if (props.stirrupThickness !== undefined) {
      const newRadius = 4 * props.stirrupThickness;
      if (props.stirrupBendingRadius !== newRadius) {
        setProps((p) => ({ ...p, stirrupBendingRadius: newRadius }));
      }
    }
  }, [props.stirrupThickness, props.stirrupBendingRadius]);

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-start gap-4 border-2 border-gray-200 rounded-lg bg-white shadow-sm w-[800px]">
        <div ref={containerRef}>
          <DrawingCanvas
            height={700}
            gridSize={50}
            labelInterval={50}
            startPoint={{ x: -150, y: -150 }}
            strokeColor="#e5e7eb"
            labelColor="#6b7280"
            labelFontSize={10}
          >
            <RectangularReinforcedConcreteSection {...props} containerRef={containerRef} />
          </DrawingCanvas>
        </div>
        <div className="flex flex-col gap-4 no-print">
          <RectangularSectionSettings
            {...props}
            onPropsChange={(newProps: Partial<RectangularReinforcedConcreteSectionProps>) =>
              setProps((p) => {
                const updatedProps = { ...p, ...newProps };
                if ('stirrupThickness' in newProps && newProps.stirrupThickness !== undefined) {
                  updatedProps.stirrupBendingRadius = 4 * newProps.stirrupThickness;
                }
                return updatedProps;
              })
            }
          />
          <PrintOptions containerRef={containerRef} width={800} height={700} />
        </div>
      </div>
    </div>
  );
}

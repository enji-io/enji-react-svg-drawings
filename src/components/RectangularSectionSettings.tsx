'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Settings2 } from 'lucide-react';

interface RectangularSectionProps {
  width?: number;
  height?: number;
  cover?: number;
  bottomRebarDiameter?: number;
  bottomRebarCount?: number;
  topRebarDiameter?: number;
  topRebarCount?: number;
  stirrupThickness?: number;
  stirrupSpacing?: number;
  concreteGrade?: string;
  rebarGrade?: string;
  onPropsChange: (props: Partial<RectangularSectionProps>) => void;
}

export function RectangularSectionSettings({
  width = 250,
  height = 400,
  cover = 25,
  bottomRebarDiameter = 20,
  bottomRebarCount = 3,
  topRebarDiameter = 16,
  topRebarCount = 2,
  stirrupThickness = 8,
  stirrupSpacing = 150,
  concreteGrade = 'C25/30',
  rebarGrade = 'B500B',
  onPropsChange,
}: RectangularSectionProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
        >
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Section Properties</SheetTitle>
          <SheetDescription>Adjust the properties of the rectangular reinforced concrete section.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 overflow-y-auto">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="width"
              className="text-right"
            >
              Width (mm)
            </Label>
            <Input
              id="width"
              type="number"
              value={width || ''}
              placeholder="Enter value"
              className="col-span-3"
              step={10}
              onChange={(e) => onPropsChange({ width: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="height"
              className="text-right"
            >
              Height (mm)
            </Label>
            <Input
              id="height"
              type="number"
              value={height || ''}
              placeholder="Enter value"
              className="col-span-3"
              step={10}
              onChange={(e) => onPropsChange({ height: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="cover"
              className="text-right"
            >
              Cover (mm)
            </Label>
            <Input
              id="cover"
              type="number"
              value={cover || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) => onPropsChange({ cover: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>

          {/* Bottom Reinforcement */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="bottomRebarCount"
              className="text-right"
            >
              Bottom Bars
            </Label>
            <Input
              id="bottomRebarCount"
              type="number"
              value={bottomRebarCount || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) => onPropsChange({ bottomRebarCount: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="bottomRebarDiameter"
              className="text-right"
            >
              Bottom Ø (mm)
            </Label>
            <Input
              id="bottomRebarDiameter"
              type="number"
              value={bottomRebarDiameter || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) =>
                onPropsChange({ bottomRebarDiameter: e.target.value === '' ? 0 : Number(e.target.value) })
              }
            />
          </div>

          {/* Top Reinforcement */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="topRebarCount"
              className="text-right"
            >
              Top Bars
            </Label>
            <Input
              id="topRebarCount"
              type="number"
              value={topRebarCount || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) => onPropsChange({ topRebarCount: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="topRebarDiameter"
              className="text-right"
            >
              Top Ø (mm)
            </Label>
            <Input
              id="topRebarDiameter"
              type="number"
              value={topRebarDiameter || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) => onPropsChange({ topRebarDiameter: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>

          {/* Stirrups */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="stirrupThickness"
              className="text-right"
            >
              Stirrup Ø (mm)
            </Label>
            <Input
              id="stirrupThickness"
              type="number"
              value={stirrupThickness || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) => {
                const value = e.target.value === '' ? 0 : Number(e.target.value);
                onPropsChange({
                  stirrupThickness: value,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="stirrupSpacing"
              className="text-right"
            >
              Spacing (mm)
            </Label>
            <Input
              id="stirrupSpacing"
              type="number"
              value={stirrupSpacing || ''}
              placeholder="Enter value"
              className="col-span-3"
              onChange={(e) => onPropsChange({ stirrupSpacing: e.target.value === '' ? 0 : Number(e.target.value) })}
            />
          </div>

          {/* Material Properties */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="concreteGrade"
              className="text-right"
            >
              Concrete
            </Label>
            <Input
              id="concreteGrade"
              value={concreteGrade}
              className="col-span-3"
              onChange={(e) => onPropsChange({ concreteGrade: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="rebarGrade"
              className="text-right"
            >
              Steel
            </Label>
            <Input
              id="rebarGrade"
              value={rebarGrade}
              className="col-span-3"
              onChange={(e) => onPropsChange({ rebarGrade: e.target.value })}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

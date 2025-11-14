import {
  Blocks,
  Component,
  ArrowLeftRight,
  Ruler,
  Square,
  Type,
  BoxSelect,
  Move,
  Dot,
  Circle,
  Minus,
  Tally4,
  Tally3,
  Tally2,
  Tally1,
  LucideIcon,
} from 'lucide-react';
import * as enjiDrawingsCore from '@/components/enji-drawings-core';

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const menuItems: NavigationItem[] = [
  {
    href: '/rectangular-reinforced-concrete-section',
    label: 'Rectangular RC Section',
    icon: Blocks,
  },
];

export const coreComponentItems: NavigationItem[] = Object.keys(enjiDrawingsCore).map((key) => {
  const label = key.replace(/([A-Z])/g, ' $1').trim();
  const href = `/docs/${key}`;
  let icon: LucideIcon;

  switch (key) {
    case 'ArrowMarker':
      icon = ArrowLeftRight;
      break;
    case 'DimensionLine':
      icon = Ruler;
      break;
    case 'DrawingCanvas':
      icon = Move;
      break;
    case 'RebarRow':
      icon = Circle;
      break;
    case 'ReferencePoint':
      icon = Dot;
      break;
    case 'RectangularOutline':
      icon = BoxSelect;
      break;
    case 'Text':
      icon = Type;
      break;
    case 'StraightBar':
      icon = Minus;
      break;
    case 'SingleBendBar':
      icon = Tally1;
      break;
    case 'DoubleBendBar':
      icon = Tally2;
      break;
    case 'TripleBendBar':
      icon = Tally3;
      break;
    case 'FourBendBar':
      icon = Tally4;
      break;
    case 'FullRectangleBar':
      icon = Square;
      break;
    default:
      icon = Component;
  }

  return {
    href,
    label,
    icon,
  };
});

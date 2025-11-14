# Cursor Navigation Guide

This guide helps you navigate and understand the enji-react-svg-drawings codebase when using Cursor.

## Quick Start

### Key Directories

- **`src/components/enji-drawings-core/`** - Core drawing primitives (SVG components)
- **`src/features/`** - Complete parametric drawings composed from core components
- **`src/app/(detailings)/`** - Next.js pages for each drawing type
- **`src/components/ui/`** - Reusable UI components (shadcn/ui)
- **`src/config/`** - Configuration files (navigation, etc.)

### Entry Points

1. **Home Page**: `src/app/page.tsx` - Lists all core components
2. **Example Drawing**: `src/app/(detailings)/rectangular-reinforced-concrete-section/page.tsx`
3. **Component Docs**: `src/app/(docs)/docs/[slug]/page.tsx` - Documentation for each component

## Understanding the Architecture

### Component Hierarchy

```
Page Component (manages state)
  └─ DrawingCanvas (SVG container)
      └─ Feature Component (e.g., RectangularSectionRC)
          ├─ RectangularOutline (concrete section)
          ├─ FullRectangleBar (stirrups)
          ├─ RebarRow (reinforcement bars)
          ├─ DimensionLine (measurements)
          └─ Text (labels)
```

### Core Components Reference

All core components are in `src/components/enji-drawings-core/`:

- **`DrawingCanvas.tsx`** - Main SVG container with grid, zoom, pan
- **`DimensionLine.tsx`** - Measurement lines with arrows
- **`RebarRow.tsx`** - Row of reinforcement bars with spacing
- **`RectangularOutline.tsx`** - Rectangular shapes with hatch patterns
- **`Text.tsx`** - Text labels and annotations
- **`FullRectangleBar.tsx`** - Complete rectangular reinforcement bars (stirrups)
- **Bar Shapes**: `StraightBar`, `SingleBendBar`, `DoubleBendBar`, `TripleBendBar`, `FourBendBar`
- **`ArrowMarker.tsx`** - SVG arrow markers
- **`ReferencePoint.tsx`** - Reference points for coordinate alignment

### Import Patterns

```typescript
// Core drawing components
import { DimensionLine, RebarRow, Text } from '@enji-drawings-core';

// UI components
import { Button, Card } from '@/components/ui/button';

// Types
import { Point } from '@/types/geometry';
```

## Common Workflows

### Finding Components

1. **Core Drawing Components**: Check `src/components/enji-drawings-core/index.ts`
2. **Feature Components**: Look in `src/features/[feature-name]/components/`
3. **UI Components**: Check `src/components/ui/`

### Understanding a Component

1. Read the component file in `enji-drawings-core/`
2. Check how it's used in feature components (e.g., `RectangularSectionRC.tsx`)
3. See examples in the docs pages: `src/app/(docs)/docs/[component-name]/page.tsx`

### Adding New Functionality

1. **New Drawing Primitive**: Add to `enji-drawings-core/` and export from `index.ts`
2. **New Parametric Drawing**: Create feature component and page
3. **New UI Element**: Add to `components/ui/` following shadcn/ui patterns

## Type Definitions

- **`Point`**: `{ x: number, y: number }` - Defined in `src/types/geometry.ts`
- All component props are TypeScript interfaces
- Check component files for prop type definitions

## Navigation Tips

### Using Cursor's Codebase Search

When searching for:
- **"How does dimension line work?"** → Look in `DimensionLine.tsx`
- **"How are drawings composed?"** → Check `RectangularSectionRC.tsx`
- **"Where is state managed?"** → Check page components in `app/(detailings)/`
- **"How to export drawings?"** → Check `PrintOptions.tsx` and `lib/export-utils.ts`

### Key Files to Understand

1. **`src/features/rectangular-section/components/RectangularSectionRC.tsx`** - Example of composing core components
2. **`src/app/(detailings)/rectangular-reinforced-concrete-section/page.tsx`** - Example of page with state management
3. **`src/components/enji-drawings-core/DrawingCanvas.tsx`** - Main canvas component
4. **`src/config/navigation.ts`** - Navigation structure

## Development Workflow

1. **Start Dev Server**: `pnpm dev`
2. **View Drawings**: Navigate to `/rectangular-reinforced-concrete-section`
3. **View Component Docs**: Navigate to `/docs/[component-name]`
4. **Type Check**: `pnpm type-check`
5. **Lint**: `pnpm lint`

## Common Patterns

### Creating a Parametric Component

```typescript
interface MyComponentProps {
  position: Point;
  width: number;
  height: number;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  position,
  width,
  height,
}) => {
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      {/* SVG elements */}
    </g>
  );
};
```

### Using Core Components

```typescript
import { DimensionLine, Text } from '@enji-drawings-core';

<DimensionLine
  start={[x1, y1]}
  end={[x2, y2]}
  label="500mm"
  offset={20}
/>
```

## Troubleshooting

- **Import errors**: Check that components are exported from `index.ts`
- **Type errors**: Ensure all props match TypeScript interfaces
- **SVG not rendering**: Check that components are inside `DrawingCanvas`
- **Styling issues**: Verify Tailwind classes are correct

## Additional Resources

- See main `README.md` for project overview
- Check `.cursor/rules` for coding conventions
- Component documentation available at `/docs/[component-name]`

import { NextResponse } from 'next/server';
import componentCodeMap from '@/lib/component-code-map.json';

// Allowlist of valid component names to prevent path traversal attacks
const VALID_COMPONENTS = [
  'ArrowMarker',
  'DimensionLine',
  'DoubleBendBar',
  'DrawingCanvas',
  'FourBendBar',
  'FullRectangleBar',
  'RadiusAnnotation',
  'RebarRow',
  'RectangularOutline',
  'ReferencePoint',
  'SingleBendBar',
  'StraightBar',
  'Text',
  'TripleBendBar',
] as const;

// Type assertion for the imported JSON
const codeMap = componentCodeMap as Record<string, string>;

/**
 * Sanitizes and validates component name
 */
function sanitizeComponentName(component: string): string | null {
  // Remove any path traversal attempts
  const sanitized = component.replace(/[./\\]/g, '');

  // Only allow alphanumeric characters and PascalCase
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(sanitized)) {
    return null;
  }

  // Check against allowlist
  if (!VALID_COMPONENTS.includes(sanitized as (typeof VALID_COMPONENTS)[number])) {
    return null;
  }

  return sanitized;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ component: string }> | { component: string } }
) {
  try {
    // Await params if it's a Promise (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;

    // Validate and sanitize component name
    const sanitizedComponent = sanitizeComponentName(resolvedParams.component);

    if (!sanitizedComponent) {
      return NextResponse.json({ error: 'Invalid component name' }, { status: 400 });
    }

    // Get the component code from the imported code map
    const content = codeMap[sanitizedComponent];

    if (!content) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json({ code: content });
  } catch (error) {
    // Don't expose internal error details
    console.error('Error reading component code:', error);

    return NextResponse.json({ error: 'Failed to read component code' }, { status: 500 });
  }
}

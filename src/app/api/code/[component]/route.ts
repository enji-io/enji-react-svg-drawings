import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

export async function GET(request: Request, { params }: { params: { component: string } }) {
  try {
    // Validate and sanitize component name
    const sanitizedComponent = sanitizeComponentName(params.component);

    if (!sanitizedComponent) {
      return NextResponse.json({ error: 'Invalid component name' }, { status: 400 });
    }

    // Construct safe file path (no path traversal possible)
    const filePath = path.join(process.cwd(), 'src/components/enji-drawings-core', `${sanitizedComponent}.tsx`);

    // Verify the file is within the expected directory
    const expectedDir = path.join(process.cwd(), 'src/components/enji-drawings-core');
    const resolvedPath = path.resolve(filePath);
    const resolvedDir = path.resolve(expectedDir);

    if (!resolvedPath.startsWith(resolvedDir)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Read file
    const content = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ code: content });
  } catch (error) {
    // Don't expose internal error details
    console.error('Error reading component code:', error);

    // Check if it's a file not found error
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to read component code' }, { status: 500 });
  }
}

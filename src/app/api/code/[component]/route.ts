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

// Cache for the code map
let codeMapCache: Record<string, string> | null = null;

/**
 * Loads the component code map from the generated JSON file
 */
async function loadCodeMap(): Promise<Record<string, string>> {
  if (codeMapCache) {
    return codeMapCache;
  }

  try {
    // Try to load from the generated code map file (build-time approach)
    const codeMapPath = path.join(process.cwd(), 'src/lib/component-code-map.json');
    const codeMapContent = await fs.readFile(codeMapPath, 'utf8');
    codeMapCache = JSON.parse(codeMapContent);
    return codeMapCache!;
  } catch (error) {
    // Fallback: try to read files directly (for development)
    console.warn('Code map not found, falling back to direct file reading');
    codeMapCache = {};

    for (const component of VALID_COMPONENTS) {
      const possiblePaths = [
        path.join(process.cwd(), 'src/components/enji-drawings-core', `${component}.tsx`),
        path.join(process.cwd(), '.next/server/app/src/components/enji-drawings-core', `${component}.tsx`),
      ];

      for (const filePath of possiblePaths) {
        try {
          const content = await fs.readFile(filePath, 'utf8');
          codeMapCache[component] = content;
          break;
        } catch {
          // Continue to next path
          continue;
        }
      }
    }

    return codeMapCache;
  }
}

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

    // Load the code map
    const codeMap = await loadCodeMap();
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

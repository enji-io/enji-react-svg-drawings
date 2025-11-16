const fs = require('node:fs');
const path = require('node:path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components/enji-drawings-core');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/component-code-map.json');

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
];

function generateCodeMap() {
  const codeMap = {};

  for (const component of VALID_COMPONENTS) {
    const filePath = path.join(COMPONENTS_DIR, `${component}.tsx`);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      codeMap[component] = content;
    } else {
      console.warn(`Warning: Component file not found: ${filePath}`);
    }
  }

  // Ensure the output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the code map to a JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(codeMap, null, 2), 'utf8');
  console.log(`Generated code map with ${Object.keys(codeMap).length} components`);
}

generateCodeMap();

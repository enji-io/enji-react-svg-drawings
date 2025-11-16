import { coreComponentItems } from '@/config/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Core Components Documentation</h1>
        <p className="text-muted-foreground">
          Explore our collection of reusable drawing components designed for structural detailing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coreComponentItems.map((item) => (
          <Link key={item.href} href={item.href} className="block transition-colors hover:no-underline">
            <Card className="h-full hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                </div>
                <CardDescription>{getComponentDescription(item.label)}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getComponentDescription(componentName: string): string {
  const descriptions: Record<string, string> = {
    'Arrow Marker': 'Create customizable arrow markers for dimension lines and annotations.',
    'Dimension Line': 'Add measurement lines with automatic arrow markers and labels.',
    'Drawing Canvas': 'A responsive canvas with grid, zoom controls, and pan functionality.',
    'Rebar Row': 'Display a row of reinforcement bars with customizable spacing and diameter.',
    'Reference Point': 'Add reference points with coordinate labels and dashed guide lines.',
    'Reinforcement Shape Code 51': 'Create standard stirrup shapes according to BS 8666:2005.',
    'Rectangular Outline': 'Draw rectangular shapes with optional concrete hatch patterns.',
    Text: 'Add text labels with customizable position, size, and rotation.',
  };

  return descriptions[componentName] || 'A core component for structural drawings.';
}

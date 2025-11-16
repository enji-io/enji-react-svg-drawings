'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer } from 'lucide-react';
import { exportToPDF, exportToPNG, exportToSVG } from '@/lib/export-utils';
import type { RefObject } from 'react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PrintOptionsProps {
  containerRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

export function PrintOptions({ containerRef, width, height }: PrintOptionsProps) {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleValueChange = async (selectedValue: string) => {
    setValue(selectedValue);
    setError(null);

    try {
      switch (selectedValue) {
        case 'print':
          window.print();
          break;
        case 'pdf':
          await exportToPDF({ containerRef, width, height });
          break;
        case 'svg':
          exportToSVG({ containerRef });
          break;
        case 'png':
          await exportToPNG({ containerRef });
          break;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during export';
      setError(errorMessage);
      console.error('Export error:', err);
    }

    // Reset the value after export to function like dropdown menu
    setTimeout(() => setValue(''), 100);
  };

  return (
    <div className="flex flex-col gap-2">
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <Printer className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Export as..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pdf">Export as PDF</SelectItem>
          <SelectItem value="svg">Export as SVG</SelectItem>
          <SelectItem value="png">Export as PNG</SelectItem>
        </SelectContent>
      </Select>
      {error && (
        <Alert variant="destructive" className="w-[140px]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-xs">Export failed</AlertTitle>
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

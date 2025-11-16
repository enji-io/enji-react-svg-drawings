'use client';

import React from 'react';
import { useDocsContext } from '../docs-context';
import { examples } from './examples';
import { notFound } from 'next/navigation';
import { DrawingCanvas } from '@/components/enji-drawings-core';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export default function ComponentPage({ params }: Props) {
  const { setCode, codeCache, setCodeCache } = useDocsContext();
  const example = examples[params.slug];
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  if (!example) {
    notFound();
  }

  React.useEffect(() => {
    const componentName = params.slug;

    // If we have the code in cache, use it
    if (codeCache[componentName]) {
      setCode(codeCache[componentName]);
      setFetchError(null);
      return;
    }

    // Otherwise fetch it
    setFetchError(null);
    fetch(`/api/code/${componentName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch code: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setCode(data.code);
        setCodeCache(componentName, data.code);
        setFetchError(null);
      })
      .catch((error) => {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load component code';
        console.error('Error fetching code:', error);
        setFetchError(errorMessage);
      });
  }, [params.slug, setCode, codeCache, setCodeCache]);

  return (
    <div className="relative flex flex-col gap-4">
      {fetchError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading code</AlertTitle>
          <AlertDescription>{fetchError}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-start gap-4 border-2 border-gray-200 rounded-lg bg-white shadow-sm w-[800px]">
        <DrawingCanvas height={550} gridSize={50} labelInterval={50} startPoint={{ x: 0, y: 0 }}>
          {example.demo}
        </DrawingCanvas>
      </div>
    </div>
  );
}

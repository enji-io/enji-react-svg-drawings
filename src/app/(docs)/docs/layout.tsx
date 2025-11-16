'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Copy, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { DocsProvider, useDocsContext } from './docs-context';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';

function DocsContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { code } = useDocsContext();
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col gap-8">
        <Tabs key={pathname} defaultValue="demo" className="w-full space-y-6">
          <TabsList className="w-full justify-start border-b rounded-none p-0 h-12 bg-transparent">
            <TabsTrigger
              value="demo"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-full"
            >
              Canvas
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-full"
            >
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="mt-6 min-h-[400px]">
            {children}
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <div className="rounded-lg overflow-hidden relative">
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 bg-white hover:bg-gray-100 text-gray-900"
                onClick={onCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
              </Button>
              <SyntaxHighlighter
                showLineNumbers
                language="tsx"
                style={coldarkDark}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                {code || ''}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsProvider>
      <DocsContent>{children}</DocsContent>
    </DocsProvider>
  );
}

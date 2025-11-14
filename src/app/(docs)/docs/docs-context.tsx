'use client';

import React, { createContext, useContext } from 'react';

interface DocsContextType {
  code: string | null;
  setCode: (code: string | null) => void;
  codeCache: Record<string, string>;
  setCodeCache: (componentName: string, code: string) => void;
}

const DocsContext = createContext<DocsContextType | null>(null);

export function DocsProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = React.useState<string | null>(null);
  const [codeCache, setCodeCacheState] = React.useState<Record<string, string>>({});

  const setCodeCache = React.useCallback((componentName: string, newCode: string) => {
    setCodeCacheState((prev) => ({ ...prev, [componentName]: newCode }));
  }, []);

  // Reset code state when component unmounts or path changes
  React.useEffect(() => {
    return () => {
      setCode(null);
    };
  }, []);

  return (
    <DocsContext.Provider
      value={{
        code,
        setCode,
        codeCache,
        setCodeCache,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocsContext() {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error('useDocsContext must be used within a DocsProvider');
  }
  return context;
}

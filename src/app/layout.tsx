'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { menuItems, coreComponentItems } from '@/config/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/') return 'Documentation';
    if (pathname === '/docs') return 'Documentation';

    const menuItem = [...menuItems, ...coreComponentItems].find((item) => item.href === pathname);
    return menuItem?.label || 'Documentation';
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar
                menuItems={menuItems}
                coreComponentItems={coreComponentItems}
              />
              <main className="flex-1 [overscroll-behavior:none]">
                <div className="flex h-[61px] items-center border-b px-6">
                  <SidebarTrigger />
                  <h1 className="text-xl font-semibold pl-3">{getPageTitle()}</h1>
                </div>
                <div className="p-6">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </div>
              </main>
            </div>
          </SidebarProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

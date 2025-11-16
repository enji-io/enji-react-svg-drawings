'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationItem } from '@/config/navigation';

interface AppSidebarProps {
  menuItems: NavigationItem[];
  coreComponentItems: NavigationItem[];
}

export function AppSidebar({ menuItems, coreComponentItems }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border p-0 pl-3">
          <div className="flex h-[60px] items-center p-0">
            <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
              <span className="whitespace-nowrap text-lg transition-all duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 overflow-hidden">
                Structural Detailing
              </span>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>RC Elements</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link passHref legacyBehavior href={item.href}>
                      <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupLabel>Core UI Components</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {coreComponentItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link passHref legacyBehavior href={item.href}>
                      <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

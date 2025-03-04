'use client';

import { usePathname } from 'next/navigation';

import { useSidebar } from '@/hooks/use-sidebar';

import { cn } from '@/utils/tw-merge';

import { DashboardNav } from './dashboard-nav';
import { SidebarHeader } from './sidebar-header';
import { UserNav } from './user-nav';

export function Sidebar() {
  const { isCollapsed } = useSidebar();

  const pathname = usePathname();

  const isDashboardPage = pathname.toLowerCase().includes('/dashboard');

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 mt-[75px] hidden h-full flex-col border-r bg-card transition-all duration-200 ease-in-out md:flex',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <SidebarHeader />
      {isDashboardPage ? <DashboardNav /> : <UserNav />}
    </aside>
  );
}

'use client';

import { usePathname } from 'next/navigation';

import { useLayout } from '@/hooks/use-layout';
import { useSidebar } from '@/hooks/use-sidebar';

import { cn } from '@/utils/tw-merge';

import { DashboardNav } from './dashboard-nav';
import { SidebarHeader } from './sidebar-header';
import { UserNav } from './user-nav';

export function Sidebar() {
  const { isCollapsed } = useSidebar();
  const { isVisibleDeactivationAlert } = useLayout();

  const pathname = usePathname();

  const isDashboardPage = pathname.toLowerCase().includes('/dashboard');

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 mt-[60px] hidden h-full flex-col border-r bg-sidebar transition-all duration-200 ease-in-out md:flex',
        isCollapsed ? 'w-16' : 'w-64',
        isVisibleDeactivationAlert && 'mt-[90px]',
      )}
    >
      <SidebarHeader />
      {isDashboardPage ? <DashboardNav /> : <UserNav />}
    </aside>
  );
}

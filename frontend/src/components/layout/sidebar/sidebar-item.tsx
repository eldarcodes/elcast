'use client';

import { type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/common/button';
import { Hint } from '@/components/ui/elements/hint';

import { useSidebar } from '@/hooks/use-sidebar';

import { cn } from '@/utils/tw-merge';

export interface RouteItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarItemProps {
  route: RouteItem;
}

export function SidebarItem({ route }: SidebarItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const isActive = pathname === route.href;

  return isCollapsed ? (
    <Hint label={route.label} side="right" asChild>
      <Button
        className={cn('h-11 w-full justify-center', isActive && 'bg-accent')}
        variant="ghost"
        asChild
      >
        <Link href={route.href}>
          <route.icon className="mr-0 size-5" />
        </Link>
      </Button>
    </Hint>
  ) : (
    <Button
      className={cn('h-11 w-full justify-start', isActive && 'bg-accent')}
      variant="ghost"
      asChild
    >
      <Link href={route.href} className="flex items-center gap-x-4">
        <route.icon className="mr-0 size-5" />
        {route.label}
      </Link>
    </Button>
  );
}

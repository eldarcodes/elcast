'use client';

import {
  KeyRound,
  MessageSquare,
  Palette,
  Settings,
  Unplug,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { type RouteItem, SidebarItem } from './sidebar-item';

export function DashboardNav() {
  const t = useTranslations('layout.sidebar.dashboardNav');

  const routes: RouteItem[] = [
    {
      label: t('settings'),
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      label: t('appearance'),
      href: '/dashboard/settings/appearance',
      icon: Palette,
    },
    // {
    //   label: t('connections'),
    //   href: '/dashboard/settings/connections',
    //   icon: Unplug,
    // },
    {
      label: t('keys'),
      href: '/dashboard/keys',
      icon: KeyRound,
    },
    {
      label: t('chatSettings'),
      href: '/dashboard/chat',
      icon: MessageSquare,
    },
    {
      label: t('followers'),
      href: '/dashboard/followers',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <SidebarItem key={route.href} route={route} />
      ))}
    </div>
  );
}

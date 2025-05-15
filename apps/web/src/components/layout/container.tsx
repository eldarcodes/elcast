'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { useLayout } from '@/hooks/use-layout';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSidebar } from '@/hooks/use-sidebar';

import { cn } from '@/utils/tw-merge';

export function LayoutContainer({ children }: PropsWithChildren<unknown>) {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const { isCollapsed, close, open } = useSidebar();
  const { isVisibleDeactivationAlert } = useLayout();

  useEffect(() => {
    if (isMobile) {
      if (!isCollapsed) close();
    } else {
      if (isCollapsed) open();
    }
  }, [isMobile]);

  return (
    <main
      className={cn(
        'mt-[60px] flex-1 p-5 md:p-6',
        isCollapsed ? 'ml-0 md:ml-16' : 'ml-16 lg:ml-64',
        isVisibleDeactivationAlert && 'mt-[90px]',
      )}
    >
      {children}
    </main>
  );
}

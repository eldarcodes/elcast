'use client';

import type { PropsWithChildren } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../common/tooltip';

interface HintProps {
  label: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  asChild?: boolean;
}

export function Hint({
  label,
  align,
  asChild,
  side,
  children,
}: PropsWithChildren<HintProps>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild} tabIndex={-1} type="button">
          {children}
        </TooltipTrigger>

        <TooltipContent
          className="border bg-foreground text-background"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

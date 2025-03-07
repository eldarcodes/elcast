import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/tw-merge';

import { Card, CardContent, CardHeader, CardTitle } from '../common/card';

interface FormWrapperProps {
  heading: string;
  contentClassName?: string;
}

export function FormWrapper({
  children,
  heading,
  contentClassName,
}: PropsWithChildren<FormWrapperProps>) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{heading}</CardTitle>
      </CardHeader>

      <CardContent className={cn('px-4 pb-4', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

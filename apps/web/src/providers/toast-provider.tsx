'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      duration={2000}
      richColors
      theme={theme === 'dark' ? 'dark' : 'light'}
      closeButton
    />
  );
}

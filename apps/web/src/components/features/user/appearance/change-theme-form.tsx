'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Form, FormField } from '@/components/ui/common/form';
import {
  ToggleCard,
  ToggleCardSkeleton,
} from '@/components/ui/elements/toggle-card';

import {
  changeThemeSchema,
  ChangeThemeSchema,
} from '@/schemas/user/change-theme.schema';

export function ChangeThemeForm() {
  const t = useTranslations('dashboard.settings.appearance.theme');

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const form = useForm<ChangeThemeSchema>({
    resolver: zodResolver(changeThemeSchema),
    values: {
      theme: theme === 'dark' ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function onChange(value: boolean) {
    const newTheme = value ? 'dark' : 'light';

    setTheme(newTheme);
    form.setValue('theme', newTheme);
    toast.success(t('successMessage'));
  }

  if (!mounted) {
    return <ToggleCardSkeleton className="h-[114px] sm:h-20" />;
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="theme"
        render={({ field }) => (
          <ToggleCard
            heading={t('heading')}
            description={t('description')}
            value={field.value === 'dark'}
            onChange={onChange}
          />
        )}
      />
    </Form>
  );
}

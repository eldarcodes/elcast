'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Form, FormField } from '@/components/ui/common/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common/select';
import { CardContainer } from '@/components/ui/elements/card-container';

import { languageOptions } from '@/libs/i18n/config';
import { setLocale } from '@/libs/i18n/locale';

import {
  changeLocaleSchema,
  ChangeLocaleSchema,
} from '@/schemas/user/change-locale.schema';

export function ChangeLocaleForm() {
  const t = useTranslations('dashboard.settings.appearance.language');

  const locale = useLocale() as ChangeLocaleSchema['locale'];

  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangeLocaleSchema>({
    resolver: zodResolver(changeLocaleSchema),
    values: {
      locale,
    },
  });

  function onSubmit(data: ChangeLocaleSchema) {
    startTransition(async () => {
      try {
        await setLocale(data.locale);
      } catch (error) {
        toast.success(t('successMessage'));
      }
    });
  }

  return (
    <CardContainer
      heading={t('heading')}
      description={t('description')}
      rightContent={
        <Form {...form}>
          <FormField
            control={form.control}
            name="locale"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('selectPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value} disabled={isPending}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Form>
      }
    />
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Form, FormField } from '@/components/ui/common/form';
import {
  ToggleCard,
  ToggleCardSkeleton,
} from '@/components/ui/elements/toggle-card';

import { useChangeNotificationsSettingsMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  changeNotificationsSchema,
  ChangeNotificationsSchema,
} from '@/schemas/user/change-notifications-settings.schema';

export function ChangeNotificationsSettingsForm() {
  const t = useTranslations('dashboard.settings.notifications');

  const { user, isLoadingProfile, refetch } = useCurrentProfile();

  const form = useForm<ChangeNotificationsSchema>({
    resolver: zodResolver(changeNotificationsSchema),
    values: {
      siteNotifications: !!user?.notificationSettings.siteNotifications,
      telegramNotifications: !!user?.notificationSettings.telegramNotifications,
    },
  });

  const [changeNotificationSettings, { loading: isLoadingChange }] =
    useChangeNotificationsSettingsMutation({
      onCompleted: (data) => {
        refetch();

        toast.success(t('successMessage'));
        if (data.changeNotificationSettings.telegramAuthToken) {
          window.open(
            `https://t.me/elcast_bot?start=${data.changeNotificationSettings.telegramAuthToken}`,
            '_blank',
          );
        }
      },
      onError: () => toast.error(t('errorMessage')),
    });

  function onChange(field: keyof ChangeNotificationsSchema, value: boolean) {
    form.setValue(field, value);

    changeNotificationSettings({
      variables: {
        data: {
          ...form.getValues(),
          [field]: value,
        },
      },
    });
  }

  if (isLoadingProfile) {
    return Array.from({ length: 2 }).map((_, index) => (
      <ToggleCardSkeleton key={index} />
    ));
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="siteNotifications"
        render={({ field }) => (
          <ToggleCard
            heading={t('siteNotifications.heading')}
            description={t('siteNotifications.description')}
            isDisabled={isLoadingChange}
            value={field.value}
            onChange={(value) => onChange('siteNotifications', value)}
          />
        )}
      />

      <FormField
        control={form.control}
        name="telegramNotifications"
        render={({ field }) => (
          <ToggleCard
            heading={t('telegramNotifications.heading')}
            description={t('telegramNotifications.description')}
            isDisabled={isLoadingChange}
            value={field.value}
            onChange={(value) => onChange('telegramNotifications', value)}
          />
        )}
      />
    </Form>
  );
}

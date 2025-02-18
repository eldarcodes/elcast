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

import { useChangeChatSettingsMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  changeChatSettingsSchema,
  ChangeChatSettingsSchema,
} from '@/schemas/chat/change-chat-settings.schema';

export function ChangeChatSettingsForm() {
  const t = useTranslations('dashboard.chat');

  const { user, isLoadingProfile } = useCurrentProfile();

  const form = useForm<ChangeChatSettingsSchema>({
    resolver: zodResolver(changeChatSettingsSchema),
    values: {
      isChatEnabled: !!user?.stream.isChatEnabled,
      isChatFollowersOnly: !!user?.stream.isChatFollowersOnly,
      isChatSubscribersOnly: !!user?.stream.isChatSubscribersOnly,
    },
  });

  const [changeChatSettings, { loading: isLoadingChange }] =
    useChangeChatSettingsMutation({
      onCompleted: () => toast.success(t('successMessage')),
      onError: () => toast.error(t('errorMessage')),
    });

  function onChange(field: keyof ChangeChatSettingsSchema, value: boolean) {
    form.setValue(field, value);

    changeChatSettings({
      variables: {
        data: {
          ...form.getValues(),
          [field]: value,
        },
      },
    });
  }

  if (isLoadingProfile) {
    return Array.from({ length: 3 }).map((_, index) => (
      <ToggleCardSkeleton key={index} />
    ));
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="isChatEnabled"
        render={({ field }) => (
          <ToggleCard
            heading={t('isChatEnabled.heading')}
            description={t('isChatEnabled.description')}
            isDisabled={isLoadingChange}
            value={field.value}
            onChange={(value) => onChange('isChatEnabled', value)}
          />
        )}
      />

      <FormField
        control={form.control}
        name="isChatFollowersOnly"
        render={({ field }) => (
          <ToggleCard
            heading={t('isChatFollowersOnly.heading')}
            description={t('isChatFollowersOnly.description')}
            isDisabled={isLoadingChange}
            value={field.value}
            onChange={(value) => onChange('isChatFollowersOnly', value)}
          />
        )}
      />

      <FormField
        control={form.control}
        name="isChatSubscribersOnly"
        render={({ field }) => (
          <ToggleCard
            heading={t('isChatSubscribersOnly.heading')}
            description={t('isChatSubscribersOnly.description')}
            isDisabled={isLoadingChange || !user?.isVerified}
            value={field.value}
            onChange={(value) => onChange('isChatSubscribersOnly', value)}
          />
        )}
      />
    </Form>
  );
}

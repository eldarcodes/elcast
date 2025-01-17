'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { Form, FormField } from '@/components/ui/common/form';
import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';

import { useChangeProfileAvatarMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  uploadFileSchema,
  UploadFileSchema,
} from '@/schemas/upload-file.schema';

export function ChangeAvatarForm() {
  const t = useTranslations('dashboard.settings.profile.avatar');

  const { user, isLoadingProfile, refetch } = useCurrentProfile();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      file: user?.avatar!,
    },
  });

  const [updateProfileAvatar, { loading: isLoadingUpdate }] =
    useChangeProfileAvatarMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('successUpdateMessage'));
      },
      onError: () => toast.error(t('errorUpdateMessage')),
    });

  function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue('file', file);
      updateProfileAvatar({ variables: { avatar: file } });
    }
  }

  if (isLoadingProfile) {
    return <ChangeAvatarFormSkeleton />;
  }

  return (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <div className="px-5 pb-5">
              <div className="w-full items-center space-x-6 lg:flex">
                <ChannelAvatar
                  size="xl"
                  channel={{
                    username: user?.username!,
                    avatar:
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value,
                  }}
                />

                <div className="space-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      className="hidden"
                      type="file"
                      ref={inputRef}
                      onChange={onImageChange}
                    />

                    <Button
                      variant="secondary"
                      onClick={() => inputRef.current?.click()}
                      disabled={isLoadingUpdate}
                    >
                      {t('updateButton')}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('info')}</p>
                </div>
              </div>
            </div>
          )}
        />
      </Form>
    </FormWrapper>
  );
}

export function ChangeAvatarFormSkeleton() {
  return <Skeleton className="h-52 w-full" />;
}

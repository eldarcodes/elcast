'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { Form, FormField } from '@/components/ui/common/form';
import { Skeleton } from '@/components/ui/common/skeleton';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';

import {
  useChangeProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} from '@/graphql/generated/output';

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
    values: {
      file: user?.avatar || undefined,
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

  const [removeProfileAvatar, { loading: isLoadingRemove }] =
    useRemoveProfileAvatarMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('successRemoveMessage'));
      },
      onError: () => toast.error(t('errorRemoveMessage')),
    });

  function onImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

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
              <div className="flex w-full flex-col justify-center sm:flex-row sm:items-center sm:justify-start sm:space-x-6">
                <ChannelAvatar
                  size="xl"
                  className="mb-3 flex justify-center sm:mb-0"
                  channel={{
                    username: user?.username!,
                    avatar:
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value,
                  }}
                />

                <div>
                  <div className="flex items-center justify-center gap-x-3 sm:justify-start">
                    <input
                      className="hidden"
                      type="file"
                      ref={inputRef}
                      onChange={onImageChange}
                    />

                    <Button
                      variant="secondary"
                      onClick={() => inputRef.current?.click()}
                      disabled={isLoadingUpdate || isLoadingRemove}
                    >
                      {t('updateButton')}
                    </Button>

                    {user?.avatar && (
                      <ConfirmModal
                        heading={t('confirmModal.heading')}
                        message={t('confirmModal.message')}
                        onConfirm={() => removeProfileAvatar()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isLoadingUpdate || isLoadingRemove}
                        >
                          <Trash className="size-4" />
                        </Button>
                      </ConfirmModal>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t('info')}
                  </p>
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

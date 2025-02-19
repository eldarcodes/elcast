'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import { Card } from '@/components/ui/common/card';
import { Form, FormField } from '@/components/ui/common/form';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';
import { ConfirmModal } from '@/components/ui/elements/confirm-modal';

import {
  type FindChannelByUsernameQuery,
  useChangeStreamThumbnailMutation,
  useRemoveStreamThumbnailMutation,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  UploadFileSchema,
  uploadFileSchema,
} from '@/schemas/upload-file.schema';

import { getMediaSource } from '@/utils/get-media-source';

interface ChangeThumbnailFormProps {
  stream: FindChannelByUsernameQuery['findChannelByUsername']['stream'];
}

export function ChangeThumbnailForm({ stream }: ChangeThumbnailFormProps) {
  const t = useTranslations('stream.settings.thumbnail');

  const { user } = useCurrentProfile();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: getMediaSource(stream?.thumbnailUrl!),
    },
  });

  const [update, { loading: isLoadingUpdate }] =
    useChangeStreamThumbnailMutation({
      onCompleted() {
        toast.success(t('successUpdateMessage'));
      },
      onError() {
        toast.error(t('errorUpdateMessage'));
      },
    });

  const [remove, { loading: isLoadingRemove }] =
    useRemoveStreamThumbnailMutation({
      onCompleted() {
        toast.success(t('successRemoveMessage'));
      },
      onError() {
        toast.error(t('errorRemoveMessage'));
      },
    });

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      form.setValue('file', file);
      update({ variables: { thumbnail: file } });
    }
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <>
            <div className="flex items-center space-x-6">
              {stream.thumbnailUrl ? (
                <Image
                  src={
                    field.value instanceof File
                      ? URL.createObjectURL(field.value)
                      : field.value!
                  }
                  alt={stream.title}
                  width={190}
                  height={80}
                  className="aspect-video rounded-lg"
                />
              ) : (
                <Card className="flex h-28 w-full flex-col items-center justify-center rounded-lg">
                  <ChannelAvatar channel={user!} />
                </Card>
              )}
              <div className="flex w-full items-center gap-x-3">
                <input
                  className="hidden"
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                />
                <Button
                  variant="secondary"
                  onClick={() => inputRef.current?.click()}
                  disabled={isLoadingUpdate || isLoadingRemove}
                >
                  {t('updateButton')}
                </Button>
                {stream.thumbnailUrl && (
                  <ConfirmModal
                    heading={t('confirmModal.heading')}
                    message={t('confirmModal.message')}
                    onConfirm={() => remove()}
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
            </div>
            <p className="text-sm text-muted-foreground">{t('info')}</p>
          </>
        )}
      />
    </Form>
  );
}

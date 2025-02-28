import type { DraggableProvided } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';

import {
  type FindSocialLinksQuery,
  useFindSocialLinksQuery,
  useRemoveSocialLinkMutation,
  useUpdateSocialLinkMutation,
} from '@/graphql/generated/output';

import {
  socialLinksSchema,
  SocialLinksSchema,
} from '@/schemas/user/social-links.schema';

import { getSocialIcon } from '@/utils/get-social-icon';

interface SocialLinkItemProps {
  socialLink: FindSocialLinksQuery['findSocialLinks'][0];
  provided: DraggableProvided;
}

export function SocialLinkItem({ provided, socialLink }: SocialLinkItemProps) {
  const t = useTranslations('dashboard.settings.profile.socialLinks.editForm');

  const [editingId, setEditingId] = useState<string | null>(null);

  const { refetch } = useFindSocialLinksQuery();

  const [updateSocialLink, { loading: isLoadingUpdate }] =
    useUpdateSocialLinkMutation({
      onCompleted: () => {
        setEditingId(null);
        refetch();

        toast.success(t('successUpdateMessage'));
      },
      onError: () => {
        toast.error(t('errorUpdateMessage'));
      },
    });

  const [removeSocialLink, { loading: isLoadingRemove }] =
    useRemoveSocialLinkMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('successRemoveMessage'));
      },
      onError: () => {
        toast.error(t('errorRemoveMessage'));
      },
    });

  const form = useForm<SocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    values: {
      title: socialLink.title ?? '',
      url: socialLink.url ?? '',
    },
  });

  function onSubmit(data: SocialLinksSchema) {
    updateSocialLink({ variables: { data, id: socialLink.id } });
  }

  const { isValid, isDirty } = form.formState;

  const Icon = getSocialIcon(socialLink.url);

  return (
    <div
      className="flex items-center gap-x-2 rounded-md border bg-background text-sm"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        className="rounded-l-md border-r px-2 py-8 text-foreground transition"
        {...provided.dragHandleProps}
      >
        <GripVertical className="size-5" />
      </div>

      <div className="w-full px-2">
        {editingId === socialLink.id ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-x-6"
            >
              <div className="w-full space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={'YouTube'}
                          className="h-8"
                          disabled={isLoadingUpdate || isLoadingRemove}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/eldarcodes"
                          className="h-8"
                          disabled={isLoadingUpdate || isLoadingRemove}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-4">
                <Button onClick={() => setEditingId(null)} variant="secondary">
                  {t('cancelButton')}
                </Button>

                <Button
                  type="submit"
                  disabled={
                    isLoadingUpdate || isLoadingRemove || !isValid || !isDirty
                  }
                >
                  {t('submitButton')}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex items-center gap-x-2">
            <Icon className="mr-2 size-4" />

            <div>
              <h2 className="text-base font-semibold text-foreground">
                {socialLink.title}
              </h2>
              <p className="text-muted-foreground">{socialLink.url}</p>
            </div>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-x-1 pr-4">
        {editingId !== socialLink.id && (
          <Button
            onClick={() => setEditingId(socialLink.id)}
            variant="ghost"
            size="icon"
          >
            <Pencil className="size-4 text-muted-foreground" />
          </Button>
        )}
        <Button
          onClick={() => removeSocialLink({ variables: { id: socialLink.id } })}
          variant="ghost"
          size="icon"
        >
          <Trash className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}

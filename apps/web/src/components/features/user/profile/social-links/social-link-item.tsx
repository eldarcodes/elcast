import type { DraggableProvided } from '@hello-pangea/dnd';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/common/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';

import {
  type FindSocialLinksQuery,
  useFindSocialLinksQuery,
  useRemoveSocialLinkMutation,
  useUpdateSocialLinkMutation,
} from '@/graphql/generated/output';

import { useMediaQuery } from '@/hooks/use-media-query';

import {
  type SocialLinksSchema,
  socialLinksSchema,
} from '@/schemas/user/social-links.schema';

import { getSocialIcon } from '@/utils/get-social-icon';

interface SocialLinkItemProps {
  socialLink: FindSocialLinksQuery['findSocialLinks'][0];
  provided: DraggableProvided;
}

export function SocialLinkItem({ provided, socialLink }: SocialLinkItemProps) {
  const t = useTranslations('dashboard.settings.profile.socialLinks');

  const [openEdit, setOpenEdit] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const { refetch } = useFindSocialLinksQuery();

  const [updateSocialLink, { loading: isLoadingUpdate }] =
    useUpdateSocialLinkMutation({
      onCompleted: () => {
        refetch();
        setOpenEdit(false);
        toast.success(t('editForm.successUpdateMessage'));
      },
      onError: () => {
        toast.error(t('editForm.errorUpdateMessage'));
      },
    });

  const [removeSocialLink, { loading: isLoadingRemove }] =
    useRemoveSocialLinkMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('editForm.successRemoveMessage'));
      },
      onError: () => {
        toast.error(t('editForm.errorRemoveMessage'));
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
      className="mb-4 flex items-center rounded-md border bg-background text-sm"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        className="rounded-l-md px-2 py-8 text-foreground transition md:border-r"
        {...provided.dragHandleProps}
      >
        <GripVertical className="size-5" />
      </div>

      <div className="flex h-full w-full max-w-[calc(100%-36px)] flex-col border-l p-2 px-4 md:flex-row md:items-center md:justify-between md:border-none">
        <div className="flex items-center gap-x-2">
          <Icon className="mr-2 hidden size-4 md:block" />

          <div className="w-full">
            <h2 className="truncate text-base font-semibold text-foreground">
              {socialLink.title}
            </h2>
            <p className="truncate text-muted-foreground">{socialLink.url}</p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-x-2 md:mt-0 md:pl-2">
          {!openEdit && (
            <Button
              onClick={() => setOpenEdit(true)}
              variant={isMobile ? 'secondary' : 'ghost'}
              size={isMobile ? 'sm' : 'icon'}
              className="flex-grow"
            >
              <Pencil className="size-4 text-muted-foreground" />
              {isMobile && <span>Edit</span>}
            </Button>
          )}

          <Button
            onClick={() =>
              removeSocialLink({ variables: { id: socialLink.id } })
            }
            variant={isMobile ? 'secondary' : 'ghost'}
            size={isMobile ? 'sm' : 'icon'}
            className="flex-grow"
          >
            <Trash className="size-4 text-muted-foreground" />
            {isMobile && <span>Delete</span>}
          </Button>
        </div>
      </div>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('editForm.heading')}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.titleLabel')}</FormLabel>

                    <FormControl>
                      <Input
                        placeholder={t('form.titlePlaceholder')}
                        disabled={isLoadingUpdate || isLoadingRemove}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {t('form.titleDescription')}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.urlLabel')}</FormLabel>

                    <FormControl>
                      <Input
                        placeholder={t('form.urlPlaceholder')}
                        disabled={isLoadingUpdate || isLoadingRemove}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {t('form.urlDescription')}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-x-2">
                <Button
                  onClick={() => setOpenEdit(false)}
                  variant="secondary"
                  type="button"
                >
                  {t('editForm.cancelButton')}
                </Button>

                <Button
                  type="submit"
                  disabled={
                    isLoadingUpdate || isLoadingRemove || !isValid || !isDirty
                  }
                >
                  {t('editForm.submitButton')}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

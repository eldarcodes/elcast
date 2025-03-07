'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import { Input } from '@/components/ui/common/input';
import { Separator } from '@/components/ui/common/separator';
import { Skeleton } from '@/components/ui/common/skeleton';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';

import {
  useCreateSocialLinkMutation,
  useFindSocialLinksQuery,
} from '@/graphql/generated/output';

import {
  socialLinksSchema,
  SocialLinksSchema,
} from '@/schemas/user/social-links.schema';

import { SocialLinksList } from './social-links-list';

export function SocialLinksForm() {
  const t = useTranslations('dashboard.settings.profile.socialLinks');

  const { loading: isLoadingLinks, refetch } = useFindSocialLinksQuery();

  const form = useForm<SocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const [createSocialLink, { loading: isLoadingCreate }] =
    useCreateSocialLinkMutation({
      onCompleted: () => {
        form.reset();
        refetch();
        toast.success(t('createForm.successMessage'));
      },
      onError: () => toast.error(t('createForm.errorMessage')),
    });

  function onSubmit(data: SocialLinksSchema) {
    createSocialLink({ variables: { data } });
  }

  const { isValid } = form.formState;

  if (isLoadingLinks) {
    return <SocialLinksFormSkeleton />;
  }

  return (
    <FormWrapper heading={t('createForm.heading')} contentClassName="pb-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.titleLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.titlePlaceholder')}
                    disabled={isLoadingCreate}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('form.titleDescription')}</FormDescription>
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
                    startIcon={LinkIcon}
                    placeholder={t('form.urlPlaceholder')}
                    disabled={isLoadingCreate}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('form.urlDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button disabled={!isValid || isLoadingCreate} type="submit">
              {t('createForm.submitButton')}
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="my-4" />

      <SocialLinksList />
    </FormWrapper>
  );
}

export function SocialLinksFormSkeleton() {
  return <Skeleton className="h-72 w-full" />;
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/common/textarea';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';

import {
  useChangeProfileInfoMutation,
  useCreateSocialLinkMutation,
  useFindSocialLinksQuery,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  changeInfoSchema,
  ChangeInfoSchema,
} from '@/schemas/user/change-info.schema';
import {
  socialLinksSchema,
  SocialLinksSchema,
} from '@/schemas/user/social-links.schema';

export function SocialLinksForm() {
  const t = useTranslations(
    'dashboard.settings.profile.socialLinks.createForm',
  );

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
        toast.success(t('successMessage'));
      },
      onError: () => toast.error(t('errorMessage')),
    });

  function onSubmit(data: SocialLinksSchema) {
    createSocialLink({ variables: { data } });
  }

  const { isValid } = form.formState;

  if (isLoadingLinks) {
    return <SocialLinksFormSkeleton />;
  }

  return (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t('titleLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('titlePlaceholder')}
                    disabled={isLoadingCreate}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('titleDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t('urlLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('urlPlaceholder')}
                    disabled={isLoadingCreate}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('urlDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex justify-end px-3 pb-3">
            <Button disabled={!isValid || isLoadingCreate} type="submit">
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function SocialLinksFormSkeleton() {
  return <Skeleton className="h-72 w-full" />;
}

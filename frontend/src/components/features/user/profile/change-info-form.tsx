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

import { useChangeProfileInfoMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  changeInfoSchema,
  ChangeInfoSchema,
} from '@/schemas/user/change-info.schema';

import { ChangeUsernameForm } from './change-username-form';

export function ChangeInfoForm() {
  const t = useTranslations('dashboard.settings.profile.info');

  const { user, isLoadingProfile, refetch } = useCurrentProfile();

  const form = useForm<ChangeInfoSchema>({
    resolver: zodResolver(changeInfoSchema),
    values: {
      displayName: user?.displayName ?? '',
      bio: user?.bio ?? '',
    },
  });

  const [updateProfileInfo, { loading: isLoadingUpdate }] =
    useChangeProfileInfoMutation({
      onCompleted: () => {
        refetch();
        toast.success(t('successMessage'));
      },
      onError: () => toast.error(t('errorMessage')),
    });

  function onSubmit(data: ChangeInfoSchema) {
    updateProfileInfo({ variables: { data } });
  }

  const { isValid, isDirty } = form.formState;

  if (isLoadingProfile) {
    return <ChangeInfoFormSkeleton />;
  }

  return (
    <FormWrapper heading={t('heading')}>
      <ChangeUsernameForm />

      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('displayNameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('displayNamePlaceholder')}
                    disabled={isLoadingUpdate}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('displayNameDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('bioLabel')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('bioPlaceholder')}
                    disabled={isLoadingUpdate}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('bioDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              disabled={!isValid || !isDirty || isLoadingUpdate}
              type="submit"
            >
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangeInfoFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}

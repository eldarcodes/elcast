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
import { FormWrapper } from '@/components/ui/elements/form-wrapper';

import { useChangeEmailMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  changeEmailSchema,
  ChangeEmailSchema,
} from '@/schemas/user/change-email.schema';

export function ChangeEmailForm() {
  const t = useTranslations('dashboard.settings.account.email');

  const { user, isLoadingProfile, refetch } = useCurrentProfile();

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    values: {
      email: user?.email ?? '',
    },
  });

  const [changeEmail, { loading: isLoadingChange }] = useChangeEmailMutation({
    onCompleted: () => {
      refetch();
      toast.success(t('successMessage'));
    },
    onError: () => toast.error(t('errorMessage')),
  });

  function onSubmit(data: ChangeEmailSchema) {
    changeEmail({ variables: { data } });
  }

  const { isValid, isDirty } = form.formState;

  if (isLoadingProfile) {
    return <ChangeEmailFormSkeleton />;
  }

  return (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@acme.com"
                    disabled={isLoadingChange}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('emailDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex justify-end px-3 pb-3">
            <Button
              disabled={!isValid || !isDirty || isLoadingChange}
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

export function ChangeEmailFormSkeleton() {
  return <Skeleton className="h-64 w-full" />;
}

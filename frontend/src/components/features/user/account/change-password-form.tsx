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
import { Separator } from '@/components/ui/common/separator';
import { FormWrapper } from '@/components/ui/elements/form-wrapper';
import { PasswordInput } from '@/components/ui/elements/password-input';

import { useChangePasswordMutation } from '@/graphql/generated/output';

import {
  changePasswordSchema,
  ChangePasswordSchema,
} from '@/schemas/user/change-password.schema';

export function ChangePasswordForm() {
  const t = useTranslations('dashboard.settings.account.password');

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const [changePassword, { loading: isLoadingChange }] =
    useChangePasswordMutation({
      onCompleted: () => {
        form.reset();
        toast.success(t('successMessage'));
      },
      onError: () => toast.error(t('errorMessage')),
    });

  function onSubmit(data: ChangePasswordSchema) {
    changePassword({ variables: { data } });
  }

  const { isValid } = form.formState;

  return (
    <FormWrapper heading={t('heading')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('oldPasswordLabel')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isLoadingChange}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('oldPasswordDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('newPasswordLabel')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isLoadingChange}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('newPasswordDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex justify-end">
            <Button disabled={!isValid || isLoadingChange} type="submit">
              {t('submitButton')}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

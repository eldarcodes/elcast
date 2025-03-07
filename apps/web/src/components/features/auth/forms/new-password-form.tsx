'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/common/form';
import { PasswordInput } from '@/components/ui/elements/password-input';

import { useNewPasswordMutation } from '@/graphql/generated/output';

import {
  newPasswordSchema,
  NewPasswordSchema,
} from '@/schemas/auth/new-password.schema';

import { AuthWrapper } from '../auth-wrapper';

export function NewPasswordForm() {
  const t = useTranslations('auth.newPassword');
  const router = useRouter();
  const params = useParams<{ token: string }>();

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  });

  const [newPassword, { loading: isLoadingNewPassword }] =
    useNewPasswordMutation({
      onCompleted: () => {
        toast.success(t('successMessage'));
        router.push('/account/login');
      },
      onError: () => toast.error(t('errorMessage')),
    });

  const { isValid } = form.formState;

  function onSubmit(data: NewPasswordSchema) {
    newPassword({
      variables: {
        data: {
          ...data,
          token: params.token,
        },
      },
    });
  }

  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/account/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordLabel')}</FormLabel>

                <FormControl>
                  <PasswordInput
                    disabled={isLoadingNewPassword}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordLabel')}</FormLabel>

                <FormControl>
                  <PasswordInput
                    disabled={isLoadingNewPassword}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="mt-2 w-full"
            disabled={!isValid || isLoadingNewPassword}
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

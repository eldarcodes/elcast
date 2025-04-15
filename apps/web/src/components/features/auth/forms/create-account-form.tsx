'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Turnstile, { useTurnstile } from 'react-turnstile';
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
import { PasswordInput } from '@/components/ui/elements/password-input';

import { useCreateUserMutation } from '@/graphql/generated/output';

import {
  createAccountSchema,
  CreateAccountSchema,
} from '@/schemas/auth/create-account.schema';

import { AuthWrapper } from '../auth-wrapper';

import { VerifyAccountByCodeForm } from './verify-account-code-form';

export function CreateAccountForm() {
  const [isShowVerification, setIsShowVerification] = useState(false);

  const t = useTranslations('auth.register');
  const { theme } = useTheme();
  const turnstile = useTurnstile();

  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      captcha: '',
    },
  });

  const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
    onCompleted: () => {
      setIsShowVerification(true);

      toast.success(t('successMessage'));
    },
    onError: () => {
      toast.error(t('errorMessage'));

      turnstile.reset();
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: CreateAccountSchema) {
    if (!data.captcha) {
      toast.warning(t('captchaWarning'));
      return;
    }

    create({ variables: { data } });
  }

  if (isShowVerification) {
    return <VerifyAccountByCodeForm />;
  }

  return (
    <AuthWrapper
      heading={t('heading')}
      subtitle={t('subtitle')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/account/login"
      showAgreement
      showSocialAuth
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('usernameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingCreate}
                    placeholder="johndoe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('usernameDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingCreate}
                    placeholder="john.doe@acme.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordLabel')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isLoadingCreate}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('passwordDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Turnstile
                    sitekey={
                      process.env['CLOUDFLARE_TURNSTILE_SITE_KEY'] as string
                    }
                    onVerify={(token) => {
                      form.setValue('captcha', token);
                    }}
                    theme={theme === 'dark' ? 'dark' : 'light'}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="mt-2 w-full"
            disabled={!isValid || isLoadingCreate}
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';
import { PasswordInput } from '@/components/ui/elements/password-input';

import { useLoginUserMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';

import { loginSchema, LoginSchema } from '@/schemas/auth/login.schema';

import { AuthWrapper } from '../auth-wrapper';

export function LoginForm() {
  const { auth } = useAuth();

  const router = useRouter();
  const t = useTranslations('auth.login');
  const { theme } = useTheme();

  const turnstile = useTurnstile();
  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
      captcha: '',
    },
  });

  const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted: (data) => {
      if (data.loginUser.message) {
        setIsShowTwoFactor(true);
      } else {
        auth();

        toast.success(t('successMessage'));
        router.push('/');
      }
    },
    onError: () => {
      toast.error(t('errorMessage'));

      turnstile.reset();
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: LoginSchema) {
    if (!data.captcha) {
      toast.warning(t('captchaWarning'));
      return;
    }

    login({ variables: { data } });
  }

  const currentPin = form.watch('pin');

  const twoFactorValid = isShowTwoFactor ? currentPin?.length === 6 : true;

  return (
    <AuthWrapper
      heading={t('heading')}
      subtitle={t('subtitle')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/account/create"
      showSocialAuth={!isShowTwoFactor}
      showAgreement
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          {isShowTwoFactor ? (
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pinLabel')}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>{t('pinDescription')}</FormDescription>
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('loginLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingLogin}
                        placeholder="johndoe"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{t('loginDescription')}</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('passwordLabel')}</FormLabel>
                      <Link
                        href="/account/recovery"
                        className="text-xs"
                        tabIndex={-1}
                      >
                        {t('forgotPassword')}
                      </Link>
                    </div>

                    <FormControl>
                      <PasswordInput
                        disabled={isLoadingLogin}
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
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
            </>
          )}

          <Button
            className="w-full"
            disabled={!isValid || isLoadingLogin || !twoFactorValid}
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

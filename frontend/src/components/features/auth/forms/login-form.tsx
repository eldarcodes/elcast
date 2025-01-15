'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';

import { useLoginUserMutation } from '@/graphql/generated/output';

import { loginSchema, LoginSchema } from '@/schemas/auth/login.schema';

import { AuthWrapper } from '../auth-wrapper';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const router = useRouter();

  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted: (data) => {
      if (data.loginUser.message) {
        setIsShowTwoFactor(true);
      } else {
        toast.success(t('successMessage'));
        router.push('/dashboard/settings');
      }
    },
    onError: () => toast.error(t('errorMessage')),
  });

  const { isValid } = form.formState;

  function onSubmit(data: LoginSchema) {
    login({ variables: { data } });
  }

  const currentPin = form.watch('pin');
  console.log({ currentPin });

  const twoFactorValid = isShowTwoFactor ? currentPin?.length === 6 : true;

  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/account/create"
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
                    <FormLabel>{t('passwordLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingLogin}
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}

          <Button
            className="mt-2 w-full"
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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/common/alert';
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

import { useDeactivateAccountMutation } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import {
  deactivateSchema,
  DeactivateSchema,
} from '@/schemas/auth/deactivate.schema';

import { AuthWrapper } from '../auth-wrapper';

export function DeactivateForm() {
  const { user, refetch } = useCurrentProfile();
  const router = useRouter();
  const t = useTranslations('auth.deactivate');

  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const form = useForm<DeactivateSchema>({
    resolver: zodResolver(deactivateSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [deactivate, { loading: isLoadingDeactivate }] =
    useDeactivateAccountMutation({
      onCompleted: (data) => {
        if (data.deactivateAccount.message) {
          setIsShowConfirm(true);
        } else {
          refetch();

          toast.success(t('successMessage'));
          router.push('/');
        }
      },
      onError: () => toast.error(t('errorMessage')),
    });

  const { isValid } = form.formState;

  function onSubmit(data: DeactivateSchema) {
    deactivate({ variables: { data } });
  }

  const currentPin = form.watch('pin');

  const twoFactorValid = isShowConfirm ? currentPin?.length === 6 : true;

  if (user && !user?.hasPassword) {
    return (
      <AuthWrapper
        heading={t('heading')}
        showLogo={false}
        backButtonLabel={t('backButtonLabel')}
        backButtonHref="/dashboard/settings?tab=security"
      >
        <Alert variant="info">
          <Info className="size-4" />
          <AlertTitle>{t('noPasswordTitle')}</AlertTitle>
          <AlertDescription>{t('noPasswordMessage')}</AlertDescription>
        </Alert>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper
      heading={t('heading')}
      showLogo={false}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/dashboard/settings"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          {isShowConfirm ? (
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingDeactivate}
                        placeholder="john.doe@acme.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{t('emailDescription')}</FormDescription>
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
                        disabled={isLoadingDeactivate}
                        placeholder="********"
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
            disabled={!isValid || isLoadingDeactivate || !twoFactorValid}
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

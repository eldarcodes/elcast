'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
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

import { useResetPasswordMutation } from '@/graphql/generated/output';

import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/schemas/auth/reset-password.schema';

import { AuthWrapper } from '../auth-wrapper';

export function ResetPasswordForm() {
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const [resetPassword, { loading: isLoadingResetPassword }] =
    useResetPasswordMutation({
      onCompleted: () => {
        setIsSuccess(true);
      },
      onError: () => toast.error(t('errorMessage')),
    });

  const { isValid } = form.formState;

  function onSubmit(data: ResetPasswordSchema) {
    resetPassword({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref="/account/login"
    >
      {isSuccess ? (
        <Alert className="my-12">
          <CircleCheck className="size-4" />
          <AlertTitle>{t('successAlertTitle')}</AlertTitle>
          <AlertDescription>{t('successAlertDescription')}</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emailLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingResetPassword}
                      placeholder="john.doe@acme.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('emailDescription')}</FormDescription>
                </FormItem>
              )}
            />

            <Button
              className="mt-2 w-full"
              disabled={!isValid || isLoadingResetPassword}
              type="submit"
            >
              {t('submitButton')}
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}

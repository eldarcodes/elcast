'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/common/input-otp';

import { useVerifyAccountByCodeMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';

import {
  verifyAccountCodeSchema,
  VerifyAccountCodeSchema,
} from '@/schemas/auth/verify-account-code.schema';

import { AuthWrapper } from '../auth-wrapper';

export function VerifyAccountByCodeForm() {
  const { auth } = useAuth();

  const router = useRouter();
  const t = useTranslations('auth.verifyCode');

  const form = useForm<VerifyAccountCodeSchema>({
    resolver: zodResolver(verifyAccountCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const [verifyAccountByCode, { loading }] = useVerifyAccountByCodeMutation({
    onCompleted: () => {
      auth();

      toast.success(t('successMessage'));
      router.push('/');
    },
    onError: () => toast.error(t('errorMessage')),
  });

  const { isValid } = form.formState;

  function onSubmit(data: VerifyAccountCodeSchema) {
    verifyAccountByCode({ variables: { data } });
  }

  const currentCode = form.watch('code');

  const twoFactorValid = currentCode?.length === 6;

  return (
    <AuthWrapper heading={t('heading')} subtitle={t('subtitle')} showAgreement>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('codeLabel')}</FormLabel>
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
                <FormDescription>{t('codeDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Button
            className="mt-2 w-full"
            disabled={!isValid || loading || !twoFactorValid}
            type="submit"
          >
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}

'use client';

import { AlertCircle, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Alert } from '@/components/ui/common/alert';

import { useVerifyAccountMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';

import { AuthWrapper } from '../auth-wrapper';

export function VerifyAccountForm() {
  const t = useTranslations('auth.verify');

  const { auth } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') ?? '';

  const [verify, { error }] = useVerifyAccountMutation({
    onCompleted: () => {
      auth();

      toast.success(t('successMessage'));
      router.push('/dashboard/settings');
    },
  });

  useEffect(() => {
    verify({ variables: { data: { token } } });
  }, [token, verify]);

  return (
    <AuthWrapper heading={t('heading')}>
      {error ? (
        <Alert variant="destructive">
          <div className="flex items-center gap-x-2">
            <AlertCircle />
            <div>{t('errorMessage')}</div>
          </div>
        </Alert>
      ) : (
        <div className="flex justify-center">
          <Loader className="size-8 animate-spin" />
        </div>
      )}
    </AuthWrapper>
  );
}

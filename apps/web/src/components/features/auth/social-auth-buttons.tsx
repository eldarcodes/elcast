'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';

import { SERVER_URL } from '@/libs/constants/url.constants';

type OAuthProvider = 'google' | 'github';

export function SocialAuthButtons() {
  const router = useRouter();
  const t = useTranslations('auth.common');

  const onClick = async (provider: OAuthProvider) => {
    const { origin: serverOrigin } = new URL(SERVER_URL);

    const response = await fetch(`${serverOrigin}/oauth/connect/${provider}`);

    if (!response.ok) {
      toast.error('Failed to sign in. Please try again later.');
      return;
    }

    const data = await response.json();

    if (data.url) {
      router.push(data.url);
    }
  };

  return (
    <>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-card px-2 text-muted-foreground">
          {t('orContinueWith')}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button onClick={() => onClick('google')} variant="outline">
          <FaGoogle className="mr-2 size-4" />
          Google
        </Button>

        <Button onClick={() => onClick('github')} variant="outline">
          <FaGithub className="mr-2 size-4" />
          GitHub
        </Button>
      </div>
    </>
  );
}

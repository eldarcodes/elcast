'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/common/button';
import { ThemeToggle } from '@/components/ui/elements/theme-toggle';

import { useAuth } from '@/hooks/use-auth';
import { useCurrentProfile } from '@/hooks/use-current-profile';

import { ProfileMenu } from './profile-menu';

export function HeaderMenu() {
  const t = useTranslations('layout.header.headerMenu');

  const { isAuthenticated } = useAuth();

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <ThemeToggle />
      {isAuthenticated ? (
        <ProfileMenu />
      ) : (
        <>
          <Link href="/account/login">
            <Button variant="secondary">{t('login')}</Button>
          </Link>
          <Link href="/account/create">
            <Button>{t('register')}</Button>
          </Link>
        </>
      )}
    </div>
  );
}

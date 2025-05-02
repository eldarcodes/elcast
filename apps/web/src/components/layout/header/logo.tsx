'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  const t = useTranslations('layout.header.logo');

  return (
    <Link
      href="/"
      className="flex items-center gap-x-2 transition-opacity hover:opacity-75"
    >
      <Image src="/images/logo-icon.svg" alt="Elcast" width={35} height={35} />

      <div className="leading-tight">
        <h2 className="text-sm font-semibold tracking-wider text-accent-foreground">
          Elcast
        </h2>

        <p className="text-xs text-muted-foreground">{t('platform')}</p>
      </div>
    </Link>
  );
}

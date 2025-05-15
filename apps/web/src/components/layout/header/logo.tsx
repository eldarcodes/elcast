'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  const t = useTranslations('layout.header.logo');

  return (
    <Link href="/" className="group flex items-center gap-x-2">
      <Image src="/images/logo-icon.svg" alt="Elcast" width={35} height={35} />

      <div className="leading-tight">
        <h2 className="text-sm font-semibold tracking-wider text-accent-foreground transition-opacity group-hover:opacity-75">
          Elcast
        </h2>

        <p className="text-xs text-muted-foreground transition-opacity group-hover:opacity-75">
          {t('platform')}
        </p>
      </div>
    </Link>
  );
}

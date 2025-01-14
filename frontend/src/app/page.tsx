'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/common/button';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="h-[2000px]">
      <Button variant="default">{t('hello')}</Button>
      <Button variant="outline">{t('hello')}</Button>
      <Button variant="secondary">{t('hello')}</Button>
      <Button variant="ghost">{t('hello')}</Button>
    </div>
  );
}

import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/common/input';
import { CardContainer } from '@/components/ui/elements/card-container';
import { CopyButton } from '@/components/ui/elements/copy-button';

interface StreamUrlProps {
  value?: string | null;
}

export function StreamUrl({ value }: StreamUrlProps) {
  const t = useTranslations('dashboard.keys.url');

  if (!value) return null;

  return (
    <CardContainer heading={t('heading')}>
      <div className="flex w-full items-center gap-x-4">
        <Input value={value ?? ''} disabled placeholder={t('heading')} />
        <CopyButton value={value} />
      </div>
    </CardContainer>
  );
}

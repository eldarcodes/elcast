import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';
import { CardContainer } from '@/components/ui/elements/card-container';
import { CopyButton } from '@/components/ui/elements/copy-button';

interface StreamKeyProps {
  value?: string | null;
}

export function StreamKey({ value }: StreamKeyProps) {
  const t = useTranslations('dashboard.keys.key');

  const [show, setShow] = useState(false);

  if (!value) return null;

  const Icon = show ? EyeOff : Eye;

  return (
    <CardContainer heading={t('heading')}>
      <div className="flex w-full items-center gap-x-4">
        <Input
          value={value ?? ''}
          disabled
          placeholder={t('heading')}
          type={show ? 'text' : 'password'}
        />
        <Button variant="ghost" onClick={() => setShow(!show)}>
          <Icon className="size-5" />
        </Button>
        <CopyButton value={value} />
      </div>
    </CardContainer>
  );
}

import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { ChangeInfoForm } from './change-info-form';
import { ChangeThumbnailForm } from './change-thumbnail-form';

interface StreamSettingsProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamSettings({ channel }: StreamSettingsProps) {
  const t = useTranslations('stream.settings');

  const { user } = useCurrentProfile();

  const isOwnerChannel = user?.id === channel.id;

  if (!isOwnerChannel) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('heading')}</DialogTitle>
        </DialogHeader>

        <ChangeThumbnailForm stream={channel.stream} />

        <ChangeInfoForm stream={channel.stream} />
      </DialogContent>
    </Dialog>
  );
}

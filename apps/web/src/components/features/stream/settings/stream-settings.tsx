import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';

import {
  type FindChannelByUsernameQuery,
  useFindChannelByUsernameQuery,
} from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { ChangeInfoForm } from './change-info-form';
import { ChangeThumbnailForm } from './change-thumbnail-form';

interface StreamSettingsProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function StreamSettings({ channel }: StreamSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations('stream.settings');

  const { refetch } = useFindChannelByUsernameQuery({
    variables: { username: channel.username },
  });

  const { user } = useCurrentProfile();

  const isOwnerChannel = user?.id === channel.id;

  if (!isOwnerChannel) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <ChangeInfoForm
          stream={channel.stream}
          onCompleted={() => {
            refetch();
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

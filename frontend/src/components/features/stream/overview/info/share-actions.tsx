import { Share } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FaReddit, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';

import { Button } from '@/components/ui/common/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/common/popover';

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output';

interface ShareActionsProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

export function ShareActions({ channel }: ShareActionsProps) {
  const t = useTranslations('stream.actions.share');

  const shareUrl = `${window.location.origin}/${channel.username}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" className="w-[250px]">
        <h2 className="font-medium">{t('heading')}</h2>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <TelegramShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-sky-500 transition-transform hover:-translate-y-1.5">
              <FaTelegram className="size-7 text-white" />
            </div>
          </TelegramShareButton>

          <TwitterShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-black transition-transform hover:-translate-y-1.5">
              <FaXTwitter className="size-7 text-white" />
            </div>
          </TwitterShareButton>

          <RedditShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-orange-600 transition-transform hover:-translate-y-1.5">
              <FaReddit className="size-7 text-white" />
            </div>
          </RedditShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}

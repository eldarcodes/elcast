import { Smile } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  EmojiPicker as EmojiPickerBase,
  EmojiPickerContent,
  EmojiPickerSearch,
} from '@/components/ui/common/emoji-picker';

import { Button } from '../common/button';
import { Popover, PopoverContent, PopoverTrigger } from '../common/popover';

interface EmojiPickerProps {
  onChange: (value: string) => void;
  isDisabled: boolean;
}

export function EmojiPicker({ onChange, isDisabled }: EmojiPickerProps) {
  const t = useTranslations('stream.chat.sendMessage');
  return (
    <Popover>
      <PopoverTrigger
        className="disabled:cursor-not-allowed"
        disabled={isDisabled}
      >
        <Button type="button" size="iconSm" variant="ghost">
          <Smile className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="top" className="mb-2 mr-10 p-0">
        <EmojiPickerBase
          columns={10}
          className="h-[326px] w-full rounded-lg shadow-md"
          onEmojiSelect={({ emoji }) => {
            onChange(emoji);
          }}
        >
          <EmojiPickerSearch placeholder={t('emojiPlaceholder')} />
          <EmojiPickerContent />
        </EmojiPickerBase>
      </PopoverContent>
    </Popover>
  );
}

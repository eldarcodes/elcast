import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';

import { cn } from '@/utils/tw-merge';

const channelVerifiedSizes = cva('', {
  variants: {
    size: {
      sm: '',
      default: 'size-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ChannelVerifiedProps = VariantProps<typeof channelVerifiedSizes>;

export function ChannelVerified({ size }: ChannelVerifiedProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full bg-primary p-0.5',
        channelVerifiedSizes({ size }),
      )}
    >
      <Check
        className={cn(
          'stroke-[4px] text-background',
          size === 'sm' ? 'size-2' : 'size-[11px]',
        )}
      />
    </span>
  );
}

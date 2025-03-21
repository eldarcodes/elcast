import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/tw-merge';

const headingSizes = cva('', {
  variants: {
    size: {
      sm: 'text-md md:text-lg',
      default: 'text-xl md:text-2xl',
      lg: 'text-3xl md:text-4xl',
      xl: 'text-4xl md:text-5xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface HeadingProps extends VariantProps<typeof headingSizes> {
  title: string;
  description?: string;
}

export function Heading({ size, title, description }: HeadingProps) {
  return (
    <div className="space-y-2">
      <h1
        className={cn('font-semibold text-foreground', headingSizes({ size }))}
      >
        {title}
      </h1>

      {description && (
        <p className="text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

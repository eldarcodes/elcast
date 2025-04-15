'use client';

import { cva, type VariantProps } from 'class-variance-authority';

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

const descriptionSizes = cva('', {
  variants: {
    size: {
      sm: 'text-xs md:text-sm',
      default: 'text-xs md:text-sm',
      lg: 'text-xs md:text-sm',
      xl: 'text-xs md:text-sm',
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

function Title({ title, size }: HeadingProps) {
  return (
    <h1 className={cn('font-semibold text-foreground', headingSizes({ size }))}>
      {title}
    </h1>
  );
}

function Description({
  description,
  size,
}: Pick<HeadingProps, 'description' | 'size'>) {
  if (!description) return null;
  return (
    <p
      className={cn(
        'text-sm text-muted-foreground md:text-base',
        descriptionSizes({ size }),
      )}
    >
      {description}
    </p>
  );
}

export function Heading({ size, title, description }: HeadingProps) {
  return (
    <div className="space-y-2">
      <Title title={title} size={size} />
      <Description description={description} />
    </div>
  );
}

Heading.Title = Title;
Heading.Description = Description;

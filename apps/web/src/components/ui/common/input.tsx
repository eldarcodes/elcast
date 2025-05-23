import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/tw-merge';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'focus-visible:ring-destructive focus-visible:ring-offset-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 transform">
            <StartIcon className="text-muted-foreground" size={18} />
          </div>
        )}

        <input
          type={type}
          className={inputVariants({
            className: cn(
              startIcon ? 'pl-8' : '',
              endIcon ? 'pr-8' : '',
              className,
            ),
            variant,
          })}
          ref={ref}
          {...props}
          value={props.value ?? ''}
        />

        {EndIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };

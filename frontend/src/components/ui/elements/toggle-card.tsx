import { useTranslations } from 'next-intl';

import { Skeleton } from '../common/skeleton';
import { Switch } from '../common/switch';

import { CardContainer } from './card-container';

interface ToggleCardProps {
  heading: string;
  description: string;
  isDisabled?: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleCard({
  heading,
  description,
  isDisabled,
  value,
  onChange,
}: ToggleCardProps) {
  const t = useTranslations('components.toggleCard');

  return (
    <CardContainer
      heading={heading}
      description={description}
      rightContent={
        <div className="flex items-center">
          <div className="mr-2 block text-sm sm:hidden">{t('edit')}: </div>
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isDisabled}
          />
        </div>
      }
    />
  );
}

export function ToggleCardSkeleton() {
  return <Skeleton className="mt-6 h-20 w-full rounded-xl" />;
}

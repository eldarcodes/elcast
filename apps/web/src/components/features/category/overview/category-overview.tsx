'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Heading } from '@/components/ui/elements/heading';
import { Tags } from '@/components/ui/elements/tags';

import { FindCategoryBySlugQuery } from '@/graphql/generated/output';

import { getMediaSource } from '@/utils/get-media-source';

import { StreamsList } from '../../stream/list/stream-list';

interface CategoryOverviewProps {
  category: FindCategoryBySlugQuery['findCategoryBySlug'];
}

export function CategoryOverview({ category }: CategoryOverviewProps) {
  const t = useTranslations('categories.overview');

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Image
          src={getMediaSource(category.thumbnailUrl)}
          alt={category.title}
          width={192}
          height={256}
          className="rounded object-cover"
        />

        <div className="space-y-2">
          <Heading.Title title={category.title} size="lg" />

          <Tags tags={category.tags} />

          <Heading.Description description={category.description || ''} />
        </div>
      </div>

      <StreamsList heading={t('heading')} streams={category.streams} />
    </div>
  );
}

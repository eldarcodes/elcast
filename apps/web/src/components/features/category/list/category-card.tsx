'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Tags } from '@/components/ui/elements/tags';

import type { FindRandomCategoriesQuery } from '@/graphql/generated/output';

import { getRandomColor } from '@/utils/color';
import { getMediaSource } from '@/utils/get-media-source';

interface CategoryCardProps {
  category: FindRandomCategoriesQuery['findRandomCategories'][0];
}

function getPaddingBottomPercent(width: number, height: number): string {
  if (width === 0) return '0%';

  const ratio = (height / width) * 100;

  return `${ratio.toFixed(5)}%`;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [randomColor, setRandomColor] = useState('');

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  const paddingBottom = getPaddingBottomPercent(285, 380);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="w-full max-w-52 flex-[1_0_auto]"
    >
      <div className="group relative cursor-pointer rounded">
        <div className="relative w-full" style={{ paddingBottom }}>
          <div
            className="absolute inset-0 flex items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              backgroundColor: randomColor,
            }}
          />

          <Image
            src={getMediaSource(category.thumbnailUrl)}
            alt={category.title}
            fill
            className="rounded transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-2 mt-1 truncate text-base font-semibold text-foreground hover:text-primary">
          {category.title}
        </h2>

        <Tags tags={category.tags} maxTags={2} />
      </div>
    </Link>
  );
}

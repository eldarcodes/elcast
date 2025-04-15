'use client';

import { TagModel } from '@/graphql/generated/output';

import { cn } from '@/utils/tw-merge';

import { Badge } from '../common/badge';

interface TagsProps {
  tags?:
    | {
        tag: Partial<TagModel>;
      }[]
    | null;
  maxTags?: number;
  className?: string;
}

export function Tags({ tags, maxTags = 10, className }: TagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {tags.slice(0, maxTags).map(({ tag }) => (
        <Badge key={tag.id} variant="secondary" className="cursor-pointer">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}

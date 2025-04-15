'use client';

import { Badge } from '../common/badge';

interface TagProps {
  name: string;
}

export function Tag({ name }: TagProps) {
  return (
    <Badge variant="secondary" className="cursor-pointer">
      {name}
    </Badge>
  );
}

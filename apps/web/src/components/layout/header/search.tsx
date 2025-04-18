'use client';

import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';

export function Search() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  const t = useTranslations('layout.header.search');

  useEffect(() => {
    const term = searchParams.get('term');
    if (term) setSearchTerm(term);
  }, [searchParams]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchTerm ? `?term=${searchTerm}` : '';
    router.push(`/streams${query}`);
  }

  return (
    <div className="ml-auto hidden sm:block">
      <form className="relative flex items-center" onSubmit={onSubmit}>
        <Input
          placeholder={t('placeholder')}
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-r-none pl-4 pr-10 lg:w-[350px]"
        />

        <Button type="submit" className="w-[40px] rounded-l-none" size="icon">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
}

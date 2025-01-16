'use client';

import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Input } from '@/components/ui/common/input';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  const t = useTranslations('layout.header.search');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchTerm) {
      router.push(`/streams?term=${searchTerm}`);
    } else {
      router.push('/streams');
    }
  }

  return (
    <div className="ml-auto hidden lg:block">
      <form className="relative flex items-center" onSubmit={onSubmit}>
        <Input
          placeholder={t('placeholder')}
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-r-none pl-4 pr-10 lg:w-[350px]"
        />

        <Button type="submit" className="w-[38px] rounded-l-none" size="icon">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
}

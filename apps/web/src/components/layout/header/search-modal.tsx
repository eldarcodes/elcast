'use client';

import debounce from 'lodash.debounce';
import {
  Folder,
  Radio,
  Search,
  SearchIcon,
  Settings,
  User,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/common/command';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';

import { useFindAllStreamsByUsernameLazyQuery } from '@/graphql/generated/output';

import { useCurrentProfile } from '@/hooks/use-current-profile';

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const t = useTranslations('layout.header.headerMenu.profileMenu');
  const { user } = useCurrentProfile();

  const [findStreams, { data }] = useFindAllStreamsByUsernameLazyQuery();

  const streams = data?.findAllStreamsByUsername ?? [];

  const router = useRouter();

  const suggestions = [
    {
      icon: User,
      name: t('channel'),
      url: `/${user?.username}`,
    },
    {
      icon: Folder,
      name: t('categories'),
      url: `/categories`,
    },
    {
      icon: Radio,
      name: t('streams'),
      url: `/streams`,
    },
    {
      icon: Users,
      name: t('followers'),
      url: '/dashboard/followers',
    },
    {
      icon: Settings,
      name: t('settings'),
      url: '/dashboard/settings',
    },
  ];

  const debouncedRefetch = useCallback(
    debounce((value) => {
      findStreams({
        variables: {
          filters: {
            searchTerm: value,
          },
        },
        onCompleted: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      });
    }, 500),
    [],
  );

  return (
    <>
      <SearchIcon
        className="block size-5 cursor-pointer sm:hidden"
        onClick={() => setOpen(true)}
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div
          className="flex h-[49px] items-center border-b px-3"
          cmdk-input-wrapper=""
        >
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />

          <input
            className={
              'flex h-10 w-full rounded-md bg-transparent py-5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
            }
            placeholder="Search for all channels or members"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);

              setLoading(true);
              debouncedRefetch(e.target.value);
            }}
          />
        </div>

        <CommandList>
          {!loading && searchTerm && !streams.length && (
            <CommandEmpty>No results found</CommandEmpty>
          )}

          {loading && searchTerm && (
            <div className="flex h-32 w-full items-center justify-center text-sm text-muted-foreground">
              Loading...
            </div>
          )}

          {searchTerm &&
            !!streams.length &&
            !loading &&
            streams.map(({ id, user, category }) => (
              <CommandItem
                key={id}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/${user.displayName}`);
                }}
              >
                <div className="flex items-center gap-2">
                  <ChannelAvatar channel={user} />

                  <div>
                    <div className="text-sm font-semibold">
                      {user.displayName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {category?.title}
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}

          {!searchTerm && (
            <CommandGroup heading="Suggestions">
              {suggestions.map(({ icon: Icon, name, url }) => (
                <CommandItem
                  key={name}
                  onSelect={() => {
                    setOpen(false);
                    router.push(url);
                  }}
                >
                  <Icon />

                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

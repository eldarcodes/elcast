import { OnlineUsersFetcher } from '@/components/features/user/online/online-users-fetcher';
import { OnlineUsersHeartbeat } from '@/components/features/user/online/online-users-heartbeat';
import { OnlineUsersListener } from '@/components/features/user/online/online-users-listener';

import { HeaderMenu } from './header-menu';
import { Logo } from './logo';
import { Search } from './search';

export function Header() {
  return (
    <header className="flex h-full items-center gap-x-4 border-b bg-card p-4">
      <OnlineUsersFetcher />
      <OnlineUsersListener />
      <OnlineUsersHeartbeat />

      <Logo />
      <Search />
      <HeaderMenu />
    </header>
  );
}

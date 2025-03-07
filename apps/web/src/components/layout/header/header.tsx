import { HeaderMenu } from './header-menu';
import { Logo } from './logo';
import { Search } from './search';

export function Header() {
  return (
    <header className="flex h-full items-center gap-x-4 border-b bg-card p-4">
      <Logo />
      <Search />
      <HeaderMenu />
    </header>
  );
}

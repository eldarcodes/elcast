import { LayoutContainer } from '@/components/layout/container';
import { Header } from '@/components/layout/header/header';
import { Sidebar } from '@/components/layout/sidebar/sidebar';

export default function SiteLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <Header />

        <Sidebar />

        <LayoutContainer>{children}</LayoutContainer>
      </div>
    </div>
  );
}

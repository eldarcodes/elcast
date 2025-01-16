import { LayoutContainer } from '@/components/layout/container';
import { Header } from '@/components/layout/header/header';
import { Sidebar } from '@/components/layout/sidebar/sidebar';

export default function SiteLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <div className="fixed inset-y-0 z-50 h-[75px] w-full">
          <Header />
        </div>

        <Sidebar />

        <LayoutContainer>{children}</LayoutContainer>
      </div>
    </div>
  );
}

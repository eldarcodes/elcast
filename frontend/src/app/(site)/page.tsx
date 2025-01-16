'use client';

import { useCurrentProfile } from '@/hooks/use-current-profile';

export default function Home() {
  const { user, isLoadingProfile } = useCurrentProfile();

  return (
    <div>{isLoadingProfile || !user ? 'Loading...' : <div>Home page</div>}</div>
  );
}

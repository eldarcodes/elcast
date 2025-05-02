'use client';

import { useAuth } from '@/hooks/use-auth';

import { GuestMenu } from './guest-menu';
import { ProfileMenu } from './profile-menu';

export function HeaderMenu() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {isAuthenticated ? <ProfileMenu /> : <GuestMenu />}
    </div>
  );
}

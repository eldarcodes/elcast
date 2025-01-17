import { LayoutDashboard, Loader, LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/common/dropdown-menu';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';

import { useLogoutUserMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';
import { useCurrentProfile } from '@/hooks/use-current-profile';

import { Notifications } from './notifications/notifications';

export function ProfileMenu() {
  const t = useTranslations('layout.header.headerMenu.profileMenu');
  const router = useRouter();

  const [logout] = useLogoutUserMutation({
    onCompleted: () => {
      exit();
      toast.success(t('successMessage'));
      router.push('/account/login');
    },
    onError: () => {
      toast.error(t('errorMessage'));
    },
  });

  const { exit } = useAuth();
  const { user, isLoadingProfile } = useCurrentProfile();

  return isLoadingProfile || !user ? (
    <Loader className="size-6 animate-spin text-muted-foreground" />
  ) : (
    <div className="flex items-center gap-x-4">
      <Notifications />

      <DropdownMenu>
        <DropdownMenuTrigger>
          {/* <ChannelAvatar channel={user} /> */}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[230px]">
          <div className="flex items-center gap-x-3 p-2">
            <ChannelAvatar channel={user} />
            <h2 className="font-medium text-foreground">{user.username}</h2>
          </div>

          <DropdownMenuSeparator />

          <Link href={`/${user.username}`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 size-4" />
              {t('channel')}
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/settings">
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboard className="mr-2 size-4" />
              {t('dashboard')}
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            <LogOut className="mr-2 size-4" />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

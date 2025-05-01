import {
  Check,
  Globe,
  KeyRound,
  Loader,
  LogOut,
  MessageSquare,
  Moon,
  Settings,
  Unplug,
  User,
  Users,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/common/dropdown-menu';
import { Switch } from '@/components/ui/common/switch';
import { ChannelAvatar } from '@/components/ui/elements/channel-avatar';

import { useLogoutUserMutation } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';
import { useCurrentProfile } from '@/hooks/use-current-profile';

import { languageOptions, Locale } from '@/libs/i18n/config';
import { setLocale } from '@/libs/i18n/locale';

import { cn } from '@/utils/tw-merge';

import { Notifications } from './notifications/notifications';
import { SearchModal } from './search-modal';

export function ProfileMenu() {
  const { theme, setTheme } = useTheme();

  const t = useTranslations('layout.header.headerMenu.profileMenu');
  const router = useRouter();

  const locale = useLocale() as Locale;

  const [isPending, startTransition] = useTransition();

  const [logout] = useLogoutUserMutation({
    onCompleted: () => {
      exit();
      toast.success(t('successMessage'));
      router.push('/');
    },
    onError: () => {
      toast.error(t('errorMessage'));
    },
  });

  const { exit } = useAuth();
  const { user, isLoadingProfile } = useCurrentProfile();

  function onLanguageSelect(value: Locale) {
    startTransition(async () => {
      try {
        await setLocale(value);
      } catch (error) {
        toast.success(t('successMessage'));
      }
    });
  }

  if (isLoadingProfile || !user) {
    return <Loader className="size-6 animate-spin text-muted-foreground" />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <SearchModal />
      <Notifications />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChannelAvatar channel={user} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[230px]">
          <div className="flex items-center gap-x-3 p-2">
            <ChannelAvatar channel={user} />
            <h2 className="font-medium text-foreground">{user.displayName}</h2>
          </div>

          <DropdownMenuSeparator />

          <Link href={`/${user.username}`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 size-4" />
              {t('channel')}
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/keys">
            <DropdownMenuItem className="cursor-pointer">
              <KeyRound className="mr-2 size-4" />
              {t('keys')}
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/chat">
            <DropdownMenuItem className="cursor-pointer">
              <MessageSquare className="mr-2 size-4" />
              {t('chatSettings')}
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/followers">
            <DropdownMenuItem className="cursor-pointer">
              <Users className="mr-2 size-4" />
              {t('followers')}
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/settings/connections">
            <DropdownMenuItem className="cursor-pointer">
              <Unplug className="mr-2 size-4" />
              {t('connections')}
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 size-4" />
              {t('settings')}
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2 size-4" />
              {t('language')}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {Object.entries(languageOptions).map(([value, label]) => (
                  <DropdownMenuItem
                    key={value}
                    disabled={isPending}
                    onClick={() => onLanguageSelect(value as Locale)}
                    className={cn(
                      'flex items-center justify-between',
                      value === locale ? '' : '',
                    )}
                  >
                    {label}
                    {value === locale && <Check />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem className="flex items-center justify-between focus:bg-transparent">
            <div className="flex items-center gap-2">
              <Moon className="mr-2 size-4" />
              {t('darkTheme')}
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(value) => {
                const nextValue = value ? 'dark' : 'light';

                setTheme(nextValue);
              }}
            />
          </DropdownMenuItem>

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

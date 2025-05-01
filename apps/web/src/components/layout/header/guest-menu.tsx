import { Check, Globe, LogIn, Moon, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/common/button';
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

import { languageOptions, Locale } from '@/libs/i18n/config';
import { setLocale } from '@/libs/i18n/locale';

import { cn } from '@/utils/tw-merge';

import { SearchModal } from './search-modal';

export function GuestMenu() {
  const { theme, setTheme } = useTheme();

  const t = useTranslations('layout.header.headerMenu');

  const locale = useLocale() as Locale;

  const [isPending, startTransition] = useTransition();

  function onLanguageSelect(value: Locale) {
    startTransition(async () => {
      try {
        await setLocale(value);
      } catch (error) {
        toast.success(t('profileMenu.successMessage'));
      }
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <SearchModal />

      <Link href="/account/login" className="hidden md:block">
        <Button variant="secondary">{t('login')}</Button>
      </Link>

      <Link href="/account/create">
        <Button>{t('register')}</Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="ghost">
            <User />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[230px]">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2 size-4" />
              {t('profileMenu.language')}
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
              {t('profileMenu.darkTheme')}
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

          <Link href="/account/login">
            <DropdownMenuItem className="cursor-pointer">
              <LogIn className="mr-2 size-4" />
              {t('profileMenu.login')}
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

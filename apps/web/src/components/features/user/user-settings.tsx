'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/common/tabs';
import { Heading } from '@/components/ui/elements/heading';

import { useCurrentProfile } from '@/hooks/use-current-profile';

import { ChangeEmailForm } from './account/change-email-form';
import { ChangePasswordForm } from './account/change-password-form';
import { DeactivateCard } from './account/deactivate-card';
import { ReactivateCard } from './account/reactivate-card';
import { WrapperTotp } from './account/totp/wrapper-totp';
import { ChangeNotificationsSettingsForm } from './notifications/change-notifications-settings-form';
import { ChangeAccentColorForm } from './profile/change-accent-color-form';
import { ChangeAvatarForm } from './profile/change-avatar-form';
import { ChangeInfoForm } from './profile/change-info-form';
import { SocialLinksForm } from './profile/social-links/social-links-form';
import { SessionsList } from './sessions/sessions-list';

export function UserSettings() {
  const t = useTranslations('dashboard.settings');
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user } = useCurrentProfile();

  const currentTab = searchParams.get('tab') || 'profile';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="lg:px-10">
      <Heading
        title={t('header.heading')}
        description={t('header.description')}
        size="lg"
      />

      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        className="mt-3 max-w-full"
      >
        <TabsList className="flex justify-between overflow-x-auto">
          <TabsTrigger className="min-w-32 flex-grow" value="profile">
            {t('header.profile')}
          </TabsTrigger>
          <TabsTrigger className="min-w-32 flex-grow" value="security">
            {t('header.security')}
          </TabsTrigger>
          <TabsTrigger className="min-w-32 flex-grow" value="notifications">
            {t('header.notifications')}
          </TabsTrigger>
          <TabsTrigger className="min-w-32 flex-grow" value="sessions">
            {t('header.sessions')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="mt-5 space-y-6">
            <Heading
              title={t('profile.header.heading')}
              description={t('profile.header.description')}
            />
            <ChangeAvatarForm />
            <ChangeInfoForm />
            <ChangeAccentColorForm />
            <SocialLinksForm />
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="mt-5 space-y-6">
            <Heading
              title={t('account.header.heading')}
              description={t('account.header.description')}
            />

            <ChangeEmailForm />
            <ChangePasswordForm />

            <Heading
              title={t('account.header.securityHeading')}
              description={t('account.header.securityDescription')}
            />

            <WrapperTotp />

            <Heading
              title={t('account.header.deactivationHeading')}
              description={t('account.header.deactivationDescription')}
            />

            {user?.isDeactivated ? <ReactivateCard /> : <DeactivateCard />}
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="mt-5 space-y-6">
            <Heading
              title={t('notifications.header.heading')}
              description={t('notifications.header.description')}
            />

            <ChangeNotificationsSettingsForm />
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <div className="mt-5 space-y-6">
            <Heading
              title={t('sessions.header.heading')}
              description={t('sessions.header.description')}
            />

            <SessionsList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

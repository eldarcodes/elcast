import { Button, Link, Text } from '@react-email/components';
import * as React from 'react';

import { MailLayout } from './components/layout';
import { MailSessionMetadata } from './components/metadata';

interface WelcomeTemplateProps {
  domain: string;
  username: string;
}

export function WelcomeTemplate({ domain, username }: WelcomeTemplateProps) {
  const channelLink = `${domain}/${username}`;
  const customizeLink = `${domain}/dashboard/settings`;
  const notificationsLink = `${domain}/dashboard/settings?tab=notifications`;

  return (
    <MailLayout preview="We’re excited to have you on board — here’s everything you need to get started.">
      <Text className="text-sm text-black">Hi {username},</Text>

      <Text className="text-sm text-black">
        Welcome to <b>Elcast</b> — we’re thrilled to have you join our
        community! 🙌
      </Text>

      <Text className="text-sm text-black">
        Your account has been successfully created, and you’re all set to start
        exploring everything we have to offer.
      </Text>

      <Text className="text-black italic" style={{ margin: '8px 0' }}>
        Here are a few ways to get started:
      </Text>

      <ul className="pl-0 mt-0 list-none text-sm text-black">
        <li className="ml-0">
          🎥 Visit{' '}
          <Link href={channelLink} className="underline">
            your channel
          </Link>{' '}
          to start streaming and connect with your audience
        </li>

        <li className="ml-0">
          🛠️{' '}
          <Link href={customizeLink} className="underline">
            Customize Your Profile
          </Link>{' '}
          – Make your space your own and connect with others.
        </li>

        <li className="ml-0">
          🔔{' '}
          <Link href={notificationsLink} className="underline">
            Stay Updated
          </Link>{' '}
          – Enable notifications to stay in the loop on the latest news and
          updates.
        </li>
      </ul>

      <Text className="text-sm text-black">
        We’re glad you’re here — let’s get started! 🚀
      </Text>
    </MailLayout>
  );
}

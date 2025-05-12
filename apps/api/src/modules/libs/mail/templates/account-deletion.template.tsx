import { Button, Text } from '@react-email/components';
import * as React from 'react';

import { MailLayout } from './components/layout';

interface AccountDeletionTemplateProps {
  domain: string;
  username: string;
}

export function AccountDeletionTemplate({
  domain,
  username,
}: AccountDeletionTemplateProps) {
  const registerLink = `${domain}/account/create`;

  return (
    <MailLayout preview="Your Elcast account has been successfully deleted, and your data has been removed.">
      <Text className="text-sm text-black">Hi {username},</Text>
      <Text className="text-sm text-black">
        We are writing to confirm that your Elcast account has been{' '}
        <b>successfully deleted</b>, as per your request, after the 7-day
        waiting period. All associated data has been permanently removed from
        our systems.
      </Text>

      <Text className="text-sm text-black">
        As a result, you will no longer receive notifications via email,
        website, or Telegram.
      </Text>

      <Text className="text-sm text-black">
        If you ever wish to return, you can easily sign up again using the
        following link:
      </Text>

      <Text
        className="text-sm text-black text-center"
        style={{ margin: '16px 0' }}
      >
        <Button
          className="rounded-md bg-primary px-[12px] py-[12px] text-center font-semibold text-white"
          href={registerLink}
        >
          👉 Sign Up
        </Button>
      </Text>

      <Text className="text-sm text-black">
        Thank you for being with us! We always look forward to seeing you on the
        platform.
      </Text>
    </MailLayout>
  );
}

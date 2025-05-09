import { Hr, Link, Section, Text } from '@react-email/components';
import * as React from 'react';

import { MailLayout } from './components/layout';

interface PasswordUpdatedTemplateProps {
  username: string;
  domain: string;
  updatedDate: Date;
}

export const PasswordUpdatedTemplate = ({
  username,
  domain,
  updatedDate,
}: PasswordUpdatedTemplateProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(updatedDate);

  const settingsLink = `${domain}/dashboard/settings`;

  return (
    <MailLayout preview="Password for your Elcast account was updated">
      <Text className="text-sm text-black">Hi {username},</Text>
      <Text className="text-sm text-black">
        You updated the password for your Elcast account on {formattedDate}. If
        this was you, then no further action is required.
      </Text>
      <Text className="text-sm text-black">
        However if you did NOT perform this password change, please{' '}
        <Link href={settingsLink} className="underline">
          reset your account password
        </Link>{' '}
        immediately.
      </Text>
      <Text className="text-sm text-black">
        Remember to use a password that is both strong and unique to your Elcast
        account. To learn more about how to create a strong and unique password,{' '}
        <Link
          href="https://blog.1password.com/how-to-generate-random-password"
          className="underline"
        >
          click here.
        </Link>
      </Text>
    </MailLayout>
  );
};

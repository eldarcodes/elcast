import { Link, Text } from '@react-email/components';
import * as React from 'react';

import { MailLayout } from './components/layout';

interface EmailUpdatedTemplateProps {
  username: string;
  domain: string;
  updatedDate: Date;
}

export const EmailUpdatedTemplate = ({
  username,
  domain,
  updatedDate,
}: EmailUpdatedTemplateProps) => {
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
    <MailLayout preview="Email for your Elcast account was updated">
      <Text className="text-sm text-black">Hi {username},</Text>
      <Text className="text-sm text-black">
        You updated the email address for your Elcast account on {formattedDate}
        . If this was you, then no further action is required.
      </Text>
      <Text className="text-sm text-black">
        However if you did NOT perform this email change, please{' '}
        <Link href={settingsLink} className="underline">
          update your account email and password
        </Link>{' '}
        immediately to secure your account.
      </Text>
      <Text className="text-sm text-black">
        Keeping your account information up to date helps ensure you can always
        recover your account and receive important notifications.
      </Text>
    </MailLayout>
  );
};

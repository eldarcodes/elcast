import { Text } from '@react-email/components';
import * as React from 'react';

import { MailLayout } from './components/layout';

interface VerifyChannelTemplateProps {
  username: string;
}

export function VerifyChannelTemplate({
  username,
}: VerifyChannelTemplateProps) {
  return (
    <MailLayout preview="Congratulations! Your channel is now verified.">
      <Text className="text-sm text-black">Hi {username},</Text>
      <Text className="text-sm text-black">
        We’re happy to let you know that your channel has been successfully{' '}
        <b>verified</b> 🎉. Your viewers will now see a{' '}
        <i>verification badge</i> next to your channel name, letting them know
        it’s the official account.
      </Text>

      <Text className="text-sm text-black">
        Thank you for being part of Elcast.
      </Text>
    </MailLayout>
  );
}

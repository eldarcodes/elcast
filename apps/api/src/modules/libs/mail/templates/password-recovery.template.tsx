import { Button, Text } from '@react-email/components';
import * as React from 'react';

import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

import { MailLayout } from './components/layout';
import { MailSessionMetadata } from './components/metadata';

interface PasswordRecoveryTemplateProps {
  domain: string;
  token: string;
  username: string;
  metadata: SessionMetadata;
}

export function PasswordRecoveryTemplate({
  domain,
  token,
  username,
  metadata,
}: PasswordRecoveryTemplateProps) {
  const resetLink = `${domain}/account/recovery/${token}`;

  return (
    <MailLayout preview="A link to reset your password">
      <Text className="text-sm text-black">Hi {username},</Text>

      <Text className="text-sm text-black">
        We received a request to reset the password for your account. If you
        made this request, you can reset your password using the link below:
      </Text>

      <Text
        className="text-sm text-black text-center"
        style={{ margin: '32px 0' }}
      >
        <Button
          className="rounded-md bg-primary px-[12px] py-[12px] text-center font-semibold text-white"
          href={resetLink}
        >
          👉 Reset Your Password
        </Button>
      </Text>

      <Text className="text-sm text-black">
        This link will expire in <b>5 minutes</b> for your security.
      </Text>

      <Text className="text-sm text-black italic">
        If you did not request a password reset, you can safely ignore this
        email — your password will remain unchanged.
      </Text>

      <MailSessionMetadata metadata={metadata} />
    </MailLayout>
  );
}

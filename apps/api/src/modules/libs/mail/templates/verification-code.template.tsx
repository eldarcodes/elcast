import { Text } from '@react-email/components';
import * as React from 'react';

import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

import { MailLayout } from './components/layout';
import { MailSessionMetadata } from './components/metadata';

interface VerificationCodeTemplateProps {
  token: string;
  username: string;
  metadata: SessionMetadata;
}

export function VerificationCodeTemplate({
  token,
  username,
  metadata,
}: VerificationCodeTemplateProps) {
  return (
    <MailLayout preview="Use the code below to verify your email.">
      <Text className="text-sm text-black">Hi {username},</Text>

      <Text className="text-sm text-black">
        To verify your email address, please enter the following 6-digit code:
      </Text>

      <div className="text-center my-5">
        <div className="bg-gray-100 rounded px-6 py-4 text-center inline-block w-40">
          <b className="text-2xl text-black">{token}</b>
        </div>
      </div>

      <Text className="text-sm text-black">
        This code will expire in <b>5 minutes</b> for your security.
      </Text>

      <Text className="text-sm text-black italic">
        If you did not request this change, you can safely ignore this email —
        your email address will remain unchanged.
      </Text>

      <MailSessionMetadata metadata={metadata} />
    </MailLayout>
  );
}

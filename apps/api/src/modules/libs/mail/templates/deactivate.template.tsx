import { Text } from '@react-email/components';
import * as React from 'react';

import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

import { MailLayout } from './components/layout';
import { MailSessionMetadata } from './components/metadata';

interface DeactivateTemplateProps {
  token: string;
  username: string;
  metadata: SessionMetadata;
}

export function DeactivateTemplate({
  token,
  username,
  metadata,
}: DeactivateTemplateProps) {
  return (
    <MailLayout preview="Use the code to confirm deactivation.">
      <Text className="text-sm text-black">Hi {username},</Text>

      <Text className="text-sm text-black">
        We received a request to deactivate your account. To confirm this
        action, please use the following code:
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
        If you did not request this, please ignore this email — your account
        will remain active.
      </Text>

      <MailSessionMetadata metadata={metadata} />
    </MailLayout>
  );
}

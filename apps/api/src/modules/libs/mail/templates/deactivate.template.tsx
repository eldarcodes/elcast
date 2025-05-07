import {
  Body,
  Head,
  Heading,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

import type { SessionMetadata } from '@/src/shared/types/session-metadata.type';

interface DeactivateTemplateProps {
  token: string;
  metadata: SessionMetadata;
}

export function DeactivateTemplate({
  token,
  metadata,
}: DeactivateTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Account Deactivation</Preview>

      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold">
              Deactivate Your Account
            </Heading>
            <Text className="text-base text-black">
              We received a request to deactivate your account at <b>Elcast</b>.
              If you initiated this request, please confirm by clicking the link
              below:
            </Text>

            <Text className="text-gray-600 text-black mt-4">
              If you didn’t request account deactivation, please ignore this
              email or contact us immediately.
            </Text>
          </Section>

          <Section className="bg-gray-100 rounded-lg p-6 text-center mb-6">
            <Heading className="text-2xl text-black font-semibold">
              Confirmation code
            </Heading>
            <Heading className="text-3xl text-black font-semibold">
              {token}
            </Heading>

            <Text className="text-black">
              This code will expire in 5 minutes.
            </Text>
          </Section>

          <Section className="bg-gray-100 rounded-lg p-6 mb-6">
            <Heading className="text-xl font-semibold text-[#18B9AE]">
              Information about this request
            </Heading>

            <ul className="list-disc list-inside mt-2">
              <li>
                🌏 Location: {metadata.location.country},{' '}
                {metadata.location.city}
              </li>
              <li>📱 Operating System: {metadata.device.os}</li>
              <li>🌐 Browser: {metadata.device.browser}</li>
              <li>💻 IP Address: {metadata.ip}</li>
            </ul>

            <Text className="text-gray-600 text-black mt-4">
              If you didn’t request a password reset, you can safely ignore this
              email. Your password will remain unchanged.
            </Text>
          </Section>

          <Section className="text-center mt-8">
            <Text className="text-gray-600">
              For any questions or support, feel free to reach out to us at{' '}
              <Link
                href="mailto:contact@eldarcodes.com"
                className="text-[#18B9AE] underline"
              >
                contact@eldarcodes.com
              </Link>
              .
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

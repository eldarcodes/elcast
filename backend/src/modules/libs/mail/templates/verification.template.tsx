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

interface VerificationTemplateProps {
  domain: string;
  token: string;
}

export function VerificationTemplate({
  domain,
  token,
}: VerificationTemplateProps) {
  const verificationLink = `${domain}/account/verify?token=${token}`;

  return (
    <Html>
      <Head />
      <Preview>Account Verification</Preview>

      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold">
              Verify Your Email Address
            </Heading>
            <Text className="text-base text-black">
              Thank you for signing up with Elcast! To complete your
              registration, please verify your email address by clicking the
              link below:
            </Text>

            <Link
              href={verificationLink}
              className="inline-flex justify-center items-center rounded-md text-sm font-medium text-white bg-[#18B9AE] px-5 py-2"
            >
              Verify Your Email
            </Link>

            <Text className="text-gray-600 text-black mt-4">
              If you didn’t sign up for an account, please ignore this email.
            </Text>
          </Section>

          <Section className="text-center mt-8">
            <Text className="text-gray-600">
              For any questions or support, feel free to reach out to us at{' '}
              <Link
                href="mailto:info@eldarcodes.com"
                className="text-[#18B9AE] underline"
              >
                info@eldarcodes.com
              </Link>
              .
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

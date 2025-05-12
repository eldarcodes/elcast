import {
  Body,
  Button,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
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

  return (
    <Html>
      <Head />
      <Preview>Your Account Has Been Deleted</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-slate-50">
          <Section className="text-center">
            <Heading className="text-3xl text-black font-bold">
              Your account has been deleted
            </Heading>
            <Text className="text-base text-black mt-2">
              We wanted to let you know that your account at Elcast has been
              successfully deleted. All associated data has been permanently
              removed from our systems.
            </Text>
          </Section>

          <Section className="bg-white text-black text-center rounded-lg shadow-md p-6 mb-4">
            <Text>
              You will no longer receive notifications on Telegram or in the
              mail.
            </Text>
            <Text>
              If you would like to return to the platform, you can sign up at
              the following link:
            </Text>
            <Link
              href={registerLink}
              className="inline-flex justify-center items-center rounded-md mt-2 text-sm font-medium text-white bg-[#18B9AE] px-5 py-2 rounded-full"
            >
              Sign up on Elcast
            </Link>
          </Section>

          <Section className="text-center text-black">
            <Text>
              Thank you for being with us! We always look forward to seeing you
              on the platform.
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

import { Link, Text } from '@react-email/components';
import * as React from 'react';

import { MailLayout } from './components/layout';

interface EnableTwoFactorTemplateProps {
  domain: string;
  username: string;
}

export function EnableTwoFactorTemplate({
  domain,
  username,
}: EnableTwoFactorTemplateProps) {
  const settingsLink = `${domain}/dashboard/settings`;

  return (
    <MailLayout preview="Protect your account">
      <Text className="text-sm text-black">Hi {username},</Text>
      <Text className="text-sm text-black">
        Your account security is important to us. To help keep your personal
        information safe, we strongly recommend enabling{' '}
        <b>Two-Factor Authentication (2FA).</b>
      </Text>

      <Text className="text-sm text-black">
        Two-Factor Authentication adds an extra layer of protection by requiring
        a second step to verify your identity when you log in. Even if someone
        knows your password, they won’t be able to access your account without
        this second factor.
      </Text>
      <Text
        className="text-[14px] text-black italic"
        style={{ margin: '8px 0' }}
      >
        Here’s why you should enable Two-Factor Authentication:
      </Text>

      <ul className="pl-2 mt-0">
        <li className="text-[14px]">
          Protects your account from unauthorized access
        </li>
        <li className="text-[14px]">Secures your personal information</li>
        <li className="text-[14px]">Gives you peace of mind</li>
      </ul>

      <Text
        className="text-[14px] text-black italic"
        style={{ margin: '16px 0 8px' }}
      >
        Enabling Two-Factor Authentication is quick and easy:
      </Text>

      <ul className="pl-2 mt-0">
        <li className="text-[14px]">
          Log in to{' '}
          <Link href={domain} className="underline">
            your account
          </Link>
        </li>
        <li className="text-[14px]">Go to Account Settings {'>'} Security</li>
        <li className="text-[14px]">
          Follow the instructions to enable Two-Factor Authentication
        </li>
      </ul>
    </MailLayout>
  );
}

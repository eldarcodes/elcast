import { Heading, Section } from '@react-email/components';
import * as React from 'react';

import { SessionMetadata } from '@/src/shared/types/session-metadata.type';

interface MailSessionMetadataProps {
  metadata: SessionMetadata;
}

export const MailSessionMetadata = ({ metadata }: MailSessionMetadataProps) => {
  const location = [metadata.location.country, metadata.location.city]
    .filter(Boolean)
    .join(', ');

  return (
    <Section className="bg-gray-100 rounded-md px-4 py-3 mb-4">
      <Heading
        className="text-[16px] font-semibold"
        style={{ margin: '0 0 8px' }}
      >
        Information about this request
      </Heading>

      <ul className="pl-0 mt-0 mb-0 list-none text-sm">
        <li className="ml-0">
          🌏 <i>Location:</i> <b>{location}</b>
        </li>
        <li className="ml-0">
          📱 <i>Operating System:</i> <b>{metadata.device.os}</b>
        </li>
        <li className="ml-0">
          🌐 <i>Browser:</i> <b>{metadata.device.browser}</b>
        </li>
        <li className="ml-0">
          💻 <i>IP Address:</i> <b>{metadata.ip}</b>
        </li>
      </ul>
    </Section>
  );
};

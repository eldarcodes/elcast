'use client';

import { FaGithub, FaGoogle } from 'react-icons/fa';

import { useGetOAuthConnectionsQuery } from '@/graphql/generated/output';

import { ConnectionItem } from './connection-item';

export const connectionsConfig = [
  {
    provider: 'google',
    name: 'Google',
    icon: FaGoogle,
  },
  {
    provider: 'github',
    name: 'GitHub',
    icon: FaGithub,
  },
];

export function ConnectionsList() {
  const { data } = useGetOAuthConnectionsQuery({});

  const connections = data?.getOAuthConnections ?? [];

  return (
    <div className="divide-y rounded border">
      {connectionsConfig.map(({ provider }) => {
        const currentConnections = connections.filter(
          (connection) => connection.provider === provider,
        );

        if (!currentConnections.length) {
          return (
            <ConnectionItem
              key={provider}
              connection={{ provider }}
              enabled={false}
            />
          );
        }

        return currentConnections.map((connection) => (
          <ConnectionItem
            key={connection.providerId}
            connection={{
              provider,
              providerId: connection.providerId,
              email: connection.email,
              createdAt: connection.createdAt,
            }}
            enabled
          />
        ));
      })}
    </div>
  );
}

'use client';

import { ApolloProvider } from '@apollo/client';

import { client } from '@/libs/apollo-client';

export function ApolloClientProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

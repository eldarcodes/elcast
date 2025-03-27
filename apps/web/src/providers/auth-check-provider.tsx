'use client';

import { useFindCurrentSessionQuery } from '@/graphql/generated/output';

import { useAuth } from '@/hooks/use-auth';

export function AuthCheckProvider() {
  const { auth, exit } = useAuth();

  useFindCurrentSessionQuery({
    onError: () => {
      exit();
    },
    onCompleted: (data) => {
      if (data.findCurrentSession.id) {
        auth();
      } else {
        exit();
      }
    },
  });

  return null;
}

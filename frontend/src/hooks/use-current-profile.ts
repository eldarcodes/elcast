import { useEffect } from 'react';

import {
  useClearSessionCookieMutation,
  useFindProfileQuery,
} from '@/graphql/generated/output';

import { useAuth } from './use-auth';

export function useCurrentProfile() {
  const { isAuthenticated, exit } = useAuth();

  const { data, loading, error, refetch } = useFindProfileQuery({
    skip: !isAuthenticated,
  });

  const [clearSessionCookie] = useClearSessionCookieMutation();

  useEffect(() => {
    if (error) {
      if (isAuthenticated) {
        clearSessionCookie();
      }

      exit();
    }
  }, [isAuthenticated, error, exit, clearSessionCookie]);

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}

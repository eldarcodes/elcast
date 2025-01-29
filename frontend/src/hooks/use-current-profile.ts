import {
  useClearSessionCookieMutation,
  useFindProfileQuery,
} from '@/graphql/generated/output';

import { useAuth } from './use-auth';

export function useCurrentProfile() {
  const { isAuthenticated, exit } = useAuth();

  const [clearSessionCookie] = useClearSessionCookieMutation();

  const { data, loading, error, refetch } = useFindProfileQuery({
    skip: !isAuthenticated,
    onError: () => {
      clearSessionCookie();
      exit();
    },
  });

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}

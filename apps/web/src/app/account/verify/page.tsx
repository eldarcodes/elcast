import { redirect } from 'next/navigation';

import { VerifyAccountByLinkForm } from '@/components/features/auth/forms/verify-account-link-form';

export default async function VerifyAccountPage(props: {
  searchParams: Promise<{ token: string }>;
}) {
  const searchParams = await props.searchParams;

  if (!searchParams.token) {
    return redirect('/account/create');
  }

  return <VerifyAccountByLinkForm />;
}

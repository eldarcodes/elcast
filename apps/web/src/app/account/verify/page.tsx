import { redirect } from 'next/navigation';

import { VerifyAccountForm } from '@/components/features/auth/forms/verify-account-form';

export default async function VerifyAccountPage(props: {
  searchParams: Promise<{ token: string }>;
}) {
  const searchParams = await props.searchParams;

  if (!searchParams.token) {
    return redirect('/account/create');
  }

  return <VerifyAccountForm />;
}

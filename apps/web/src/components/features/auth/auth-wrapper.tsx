import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/common/button';
import { Card, CardContent } from '@/components/ui/common/card';

import { SocialAuthButtons } from './social-auth-buttons';

interface AuthWrapperProps {
  heading: string;
  subtitle?: string;

  backButtonLabel?: string;
  backButtonHref?: string;

  showAgreement?: boolean;
  showSocialAuth?: boolean;
}

export function AuthWrapper({
  children,

  heading,
  subtitle,
  backButtonHref,
  backButtonLabel,
  showAgreement = false,
  showSocialAuth = false,
}: React.PropsWithChildren<AuthWrapperProps>) {
  const t = useTranslations('auth.common');

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="flex flex-col gap-4 p-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="mb-1 text-2xl font-bold">{heading}</h1>
                {subtitle && (
                  <p className="text-balance text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>

              <div>{children}</div>
              {showSocialAuth && <SocialAuthButtons />}

              {backButtonLabel && backButtonHref && (
                <Link href={backButtonHref} className="w-full" tabIndex={-1}>
                  <Button variant="ghost" className="w-full" type="button">
                    {backButtonLabel}
                  </Button>
                </Link>
              )}
            </div>

            <div className="relative hidden bg-muted dark:bg-foreground md:block">
              <Image
                src="/images/logo-vertical.svg"
                alt="Image"
                width={500}
                height={500}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </CardContent>
        </Card>

        {showAgreement && (
          <div className="mt-6 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            {t.rich('agreement', {
              terms: (chunks) => <a href="#">{chunks}</a>,
              privacy: (chunks) => <a href="#">{chunks}</a>,
            })}
          </div>
        )}
      </div>
    </div>
  );
}

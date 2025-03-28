import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/common/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/common/card';

import { SocialAuthButtons } from './social-auth-buttons';

interface AuthWrapperProps {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;

  showSocialAuth?: boolean;
}

export function AuthWrapper({
  children,

  heading,
  backButtonHref,
  backButtonLabel,
  showSocialAuth = false,
}: React.PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="mx-2 flex h-full items-center justify-center md:mx-0">
      <Card className="w-[450px]">
        <CardHeader className="flex-row items-center justify-center gap-x-4">
          <Image
            src="/images/logo-icon.svg"
            alt="Elcast"
            width={40}
            height={40}
          />
          <CardTitle className="text-xl" style={{ marginTop: 0 }}>
            {heading}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {showSocialAuth && <SocialAuthButtons />}
          {children}
        </CardContent>

        <CardFooter className="-mt-2">
          {backButtonLabel && backButtonHref && (
            <Link href={backButtonHref} className="w-full" tabIndex={-1}>
              <Button variant="ghost" className="w-full" type="button">
                {backButtonLabel}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

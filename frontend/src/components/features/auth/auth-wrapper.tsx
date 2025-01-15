import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/common/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/common/card';

interface AuthWrapperProps {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function AuthWrapper({
  children,

  heading,
  backButtonHref,
  backButtonLabel,
}: React.PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader className="flex-row items-center justify-center gap-x-4">
          <Image src="/images/logo.svg" alt="Elcast" width={40} height={40} />
          <CardTitle className="text-xl" style={{ marginTop: 0 }}>
            {heading}
          </CardTitle>
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter className="-mt-2">
          {backButtonLabel && backButtonHref && (
            <Button variant="ghost" className="w-full">
              <Link href={backButtonHref}>{backButtonLabel}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

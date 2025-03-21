import { type NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { url, cookies, nextUrl } = request;
  const sessionId = cookies.get('sid')?.value;

  const isAccountPage = nextUrl.pathname.startsWith('/account');
  const isDeactivatePage = nextUrl.pathname === '/account/deactivate';
  const isVerifyPage = nextUrl.pathname === '/account/verify';
  const isDashboardPage = nextUrl.pathname.startsWith('/dashboard');

  let isAuthorized = false;

  if (sessionId) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `sid=${sessionId}`,
        },
        body: JSON.stringify({
          query: 'query { findCurrentSession { id } }',
        }),
      });

      const result = await response.json();

      isAuthorized = !!result.data?.findCurrentSession?.id;
    } catch (error) {
      console.error('Session validation failed:', error);
    }
  }

  if (!isAuthorized && isDashboardPage) {
    return NextResponse.redirect(new URL('/account/login', url));
  }

  if (!isAuthorized && isDeactivatePage) {
    return NextResponse.redirect(new URL('/account/login', url));
  }

  if (isAuthorized && isAccountPage && !isDeactivatePage && !isVerifyPage) {
    return NextResponse.redirect(new URL('/dashboard/settings', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/dashboard/:path*'],
};

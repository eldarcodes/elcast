import { type NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { url, cookies, nextUrl } = request;

  const isAuthorized = cookies.get('sid')?.value;

  const isAccountPage = nextUrl.pathname.startsWith('/account');
  const isDeactivatePage = nextUrl.pathname === '/account/deactivate';
  const isDashboardPage = nextUrl.pathname.startsWith('/dashboard');
  console.log({
    isAuthorized,
    isAccountPage,
    isDeactivatePage,
    isDashboardPage,
  });

  if (!isAuthorized && isDashboardPage) {
    return NextResponse.redirect(new URL('/account/login', url));
  }

  if (!isAuthorized && isDeactivatePage) {
    return NextResponse.redirect(new URL('/account/login', url));
  }

  if (isAuthorized && isAccountPage && !isDeactivatePage) {
    return NextResponse.redirect(new URL('/dashboard/settings', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/dashboard/:path*'],
};

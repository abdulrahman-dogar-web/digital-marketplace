import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In a real app, we'd check a session cookie from Supabase
  // For this prototype, we'll look for a mock auth cookie
  const authSession = request.cookies.get('cybernest_session');

  if (pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
    if (!authSession) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};

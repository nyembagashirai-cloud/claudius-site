import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';

/**
 * Gate every /admin route except the login screen. The JWT is verified at
 * the edge so an expired or forged cookie never reaches a page component.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };

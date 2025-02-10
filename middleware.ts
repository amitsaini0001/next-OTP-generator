import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip authentication for static files, auth API endpoint, and auth page for unauthenticated users
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname === '/api/auth' ||
    request.nextUrl.pathname === '/favicon.ico' ||
    (!request.cookies.get('isAuthenticated') && request.nextUrl.pathname === '/auth')
  ) {
    return NextResponse.next();
  }

  const authStatus = request.cookies.get('isAuthenticated');
  
  // If authenticated and trying to access auth page, redirect to home
  if (authStatus && authStatus?.value === 'true' && request.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If not authenticated, redirect to auth page
  if (!authStatus || authStatus.value !== 'true') {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Store the original URL to redirect back after authentication
    const url = new URL('/auth', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 
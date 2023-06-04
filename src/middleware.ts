import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequest) {
    // return NextResponse
    return NextResponse.rewrite(new URL('/', req.url));
  },
  // If user is admin then run this function
  {
    callbacks: {
      authorized({ token }) {
        return token?.role === 'admin';
      },
    },
  }
);

export const config = { matcher: ['/', '/admin', '/book'] };

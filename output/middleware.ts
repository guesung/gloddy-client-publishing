import { NextRequest, NextResponse } from 'next/server';

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('onboarding', request.nextUrl.origin));
  }
};

const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/'],
};
export { config, middleware };

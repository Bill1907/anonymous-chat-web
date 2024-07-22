import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if(request.nextUrl.pathname.startsWith('/chat')) {
        if (!token) {    
            return NextResponse.redirect(new URL('/', request.url))
        } else {
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('Authorization', `Bearer ${token}`)
            const response = NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
            return response
        }
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }
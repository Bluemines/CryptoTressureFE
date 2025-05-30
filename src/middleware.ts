import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|login|register).*)"],
};
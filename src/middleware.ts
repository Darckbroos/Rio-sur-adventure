import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['en', 'es'];
export let defaultLocale = 'es';

function getLocale(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );
    
    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        );
    }
}

export const config = {
    // Matcher excluding `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};

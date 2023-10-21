import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALIZATION_KEY,
} from '@/translations/locales';
import createMiddleware from 'next-intl/middleware';
import { NextFetchEvent, NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: true,
  localePrefix: 'always',
});

function getLocaleAndRoute(request: NextRequest) {
  let previousRoute = request.headers.get('referer') ?? undefined;
  // always will be of one of these formats: /[locale]/[route] or /[route]
  const splitLink = request.nextUrl.clone().pathname.slice(1).split('/');
  const linkHasLocale = Object.keys(LOCALES).includes(splitLink[0]);

  const linkLocale = linkHasLocale ? splitLink[0] : undefined;
  const cookieLocale =
    request.cookies.get(LOCALIZATION_KEY)?.value !== 'undefined'
      ? request.cookies.get(LOCALIZATION_KEY)?.value
      : undefined;
  const locale = linkLocale || cookieLocale || DEFAULT_LOCALE;

  const tempRoute = linkHasLocale
    ? splitLink.filter((item, index) => index !== 0).join('/')
    : splitLink.join('/');
  const routeWithoutLocale = '/' + tempRoute;

  return {
    locale,
    routeWithoutLocale,
    previousRoute,
  };
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  const { locale } = getLocaleAndRoute(request);

  request.cookies.set(LOCALIZATION_KEY, locale);
  request.cookies.set('accept-language', locale);
  // @ts-ignore-next-line
  const Response = handleI18nRouting(request);
  Response.headers.set('x-default-locale', locale);
  return Response;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

const locale =
  typeof window !== 'undefined'
    ? window?.localStorage.getItem('i18nextLng') || 'en-US'
    : 'en-US';

const Routes = {
  LANDING_PAGE: '/',
  CREATE: '/create',
  CV: '/cv',
};

const RouteKeys = Object.keys(Routes) as (keyof typeof Routes)[];

const RoutesWithLocale = RouteKeys.reduce((acc, key) => {
  acc[key] = `/${locale}${Routes[key]}`;
  if (acc[key].endsWith('/')) acc[key] = acc[key].slice(0, -1);
  return acc;
}, {} as { [key in keyof typeof Routes]: string });

export { Routes, RoutesWithLocale, locale };

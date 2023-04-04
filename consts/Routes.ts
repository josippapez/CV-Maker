import { useEffect, useState } from 'react';

const isClientSide = typeof window !== 'undefined';

const locale = isClientSide
  ? window?.localStorage.getItem('i18nextLng') || 'en-US'
  : 'en-US';

const Routes = {
  LANDING_PAGE: '/',
  CREATE: '/create',
  CV: '/cv',
};

export const RouteKeys = Object.keys(Routes) as (keyof typeof Routes)[];

const calculateRoutesWithLocale = (locale: string) =>
  RouteKeys.reduce((acc, key) => {
    acc[key] = `/${locale}${Routes[key]}`;
    if (acc[key].endsWith('/')) acc[key] = acc[key].slice(0, -1);
    return acc;
  }, {} as { [key in keyof typeof Routes]: string });

const RoutesWithLocale = calculateRoutesWithLocale(locale);

const useRoutesWithLocale = () => {
  const [locale, setLocale] = useState(
    typeof window !== 'undefined'
      ? window?.localStorage.getItem('i18nextLng') || 'en-US'
      : 'en-US'
  );

  const [routesWithLocale, setRoutesWithLocale] = useState(
    calculateRoutesWithLocale(locale)
  );

  useEffect(() => {
    const handleLocaleChange = () => {
      const newLocale = window.localStorage.getItem('i18nextLng') || 'en-US';
      setLocale(newLocale);
    };
    window.addEventListener('storage', handleLocaleChange);

    setRoutesWithLocale(calculateRoutesWithLocale(locale));

    return () => {
      window.removeEventListener('storage', handleLocaleChange);
    };
  }, [locale]);

  return routesWithLocale;
};

export { Routes, RoutesWithLocale, locale, useRoutesWithLocale };

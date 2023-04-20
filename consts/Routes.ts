import { useEffect, useState } from 'react';
import lngDetector from 'ssg-setup/lngDetector';

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

export const calculateRoutesWithLocale = (locale: string) =>
  RouteKeys.reduce((acc, key) => {
    acc[key] = `/${locale}${Routes[key]}`;
    if (acc[key].endsWith('/')) acc[key] = acc[key].slice(0, -1);
    return acc;
  }, {} as { [key in keyof typeof Routes]: string });

const RoutesWithLocale = calculateRoutesWithLocale(locale);

const useRoutesWithLocale = () => {
  const [routesWithLocale, setRoutesWithLocale] = useState(
    calculateRoutesWithLocale(locale)
  );

  return routesWithLocale;
};

export { Routes, RoutesWithLocale, useRoutesWithLocale };

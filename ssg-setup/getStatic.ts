import { Routes } from 'consts/Routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../next-i18next.config';

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map(lng => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = (ctx: any) => {
  return {
    fallback: false,
    paths: getI18nPaths(),
  };
};

export async function getI18nProps(ctx: any, ns: string[] = []) {
  const locale = ctx?.params?.locale;

  const RoutesWithLocale = Object.keys(Routes).reduce((acc, key) => {
    acc[key] = `/${locale}${Routes[key]}`;
    if (acc[key].endsWith('/')) acc[key] = acc[key].slice(0, -1);
    return acc;
  }, {} as { [key in keyof typeof Routes]: string });

  const props = {
    ...(await serverSideTranslations(locale, ns, {
      debug: i18nextConfig.debug,
      i18n: i18nextConfig.i18n,
      defaultNS: ns[0],
    })),
    RoutesWithLocale,
  };

  return props;
}

export function makeStaticProps(ns: string[] = []) {
  return async function getStaticProps(ctx: any) {
    return {
      props: await getI18nProps(ctx, ns),
    };
  };
}

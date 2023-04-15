import { calculateRoutesWithLocale } from 'consts/Routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import lngDetector from 'ssg-setup/lngDetector';
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
  lngDetector.cache?.(locale);
  const RoutesWithLocale = calculateRoutesWithLocale(locale);

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

import { LOCALES } from '@/translations/locales';
import { Routes } from 'consts/Routes';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  LOCALES.forEach(locale => {
    Object.values(Routes).forEach(route =>
      routes.push({
        url:
          `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}` +
          (route !== Routes.LANDING_PAGE ? `${route}/` : route),
        lastModified: new Date(),
        changeFrequency: 'monthly',
      })
    );
  });
  return routes;
}

import { LandingPage } from '@modules/LandingPage/LandingPage';
import { generateSeo } from '@modules/SEO/generateSeo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations('LandingPage.Metadata');

  return generateSeo({
    title: t('title'),
    description: t('description'),
  });
}

export default async function Homepage({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  return <LandingPage />;
}

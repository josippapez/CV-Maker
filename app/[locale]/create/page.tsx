import { CVMakerPage } from '@modules/PDFView/CVMakerPage';
import { generateSeo } from '@modules/SEO/generateSeo';
import { getTranslator } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslator(locale, 'MakerPage.Metadata');

  return generateSeo({
    title: t('title'),
    description: t('description'),
  });
}

export default async function CreatePage({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  return <CVMakerPage />;
}

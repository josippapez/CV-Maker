import { CVMakerPreviewPage } from '@modules/PDFPreview/CVMakerPreviewPage';
import { generateSeo } from '@modules/SEO/generateSeo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations('PreviewPage.Metadata');

  return generateSeo({
    title: t('title'),
    description: t('description'),
  });
}

export default async function PreviewPage({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  return <CVMakerPreviewPage />;
}

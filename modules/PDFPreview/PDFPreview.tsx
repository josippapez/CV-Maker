import {
  DocumentPDFData,
  getCVPreviewForUser,
} from '@/store/actions/syncActions';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { PageLoader } from '@modules/Shared/Loader/PageLoader';
import { Routes } from 'consts/Routes';
import { useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const DynamicPDFDisplay = dynamic(
  () =>
    import('@modules/Shared/PDFDisplay/PDFDisplay').then(mod => ({
      default: mod.PDFDisplay,
    })),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

const isQueryString = (query: string | string[] | undefined): query is string =>
  typeof query === 'string';

export const PDFPreview = () => {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const { setAllPreviewData, previewData } = usePDFData();

  const userId = isQueryString(params.userid) ? params.userid : null;
  const isPDFPreview = Boolean(userId);

  const data = {
    generalInfo: previewData?.generalInfo,
    professionalExperience: previewData?.professionalExperience,
    certificates: previewData?.certificates,
    education: previewData?.education,
    languages: previewData?.languages,
    skills: previewData?.skills,
    template: { templateName: previewData?.template },
    projects: previewData?.projects,
  };

  useEffect(() => {
    if (isPDFPreview) {
      if (!userId) return;

      getCVPreviewForUser(userId, (data: DocumentPDFData) => {
        setAllPreviewData(data);
        if (locale !== data.language) {
          router.push(
            `${Routes.CV}/${userId}`,
            {locale: data.language}
          );
        }
      });
    }
  }, []);

  return <DynamicPDFDisplay isPDFPreview data={data} />;
};

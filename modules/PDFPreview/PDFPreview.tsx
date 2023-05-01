import {
  DocumentPDFData,
  getCVPreviewForUser,
} from '@/store/actions/syncActions';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { PageLoader } from '@modules/Shared/Loader';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getI18n } from 'react-i18next';

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

const isQueryUserIdString = (
  query: string | string[] | undefined
): query is string => typeof query === 'string';

export const PDFPreview = () => {
  const { query } = useRouter();
  const { setAllPreviewData, previewData } = usePDFData();

  const userId = isQueryUserIdString(query.userId) ? query.userId : null;
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
        getI18n().changeLanguage(data.language);
      });
    }
  }, []);

  return <DynamicPDFDisplay isPDFPreview data={data} />;
};

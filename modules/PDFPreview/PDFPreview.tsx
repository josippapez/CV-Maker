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
  const { setActiveTemplate, setAllData } = usePDFData();

  const userId = isQueryUserIdString(query.userId) ? query.userId : null;
  const isPDFPreview = Boolean(userId);

  useEffect(() => {
    if (isPDFPreview) {
      if (!userId) return;

      getCVPreviewForUser(userId, (data: DocumentPDFData) => {
        getI18n()
          .changeLanguage(data.language)
          .then(() => {
            setActiveTemplate(data.template.templateName);
            setAllData(data);
          });
      });
    }
  }, []);

  return <DynamicPDFDisplay isPDFPreview />;
};

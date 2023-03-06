import { usePDFData } from '@/Hooks';
import { DocumentPDFData, getCVPreviewForUser } from '@/store';
import { PDFDisplay } from '@modules/Shared/PDFDisplay';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getI18n } from 'react-i18next';

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

  return <PDFDisplay isPDFPreview />;
};

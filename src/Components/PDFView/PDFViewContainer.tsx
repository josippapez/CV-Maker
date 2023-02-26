import usePDFData from '@/Hooks/usePDFData';
import { useAuth } from '@/Providers/AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DocumentPDFData,
  getCVPreviewForUser,
} from '../../store/actions/syncActions';
import PDFViewPresenter from './PDFViewPresenter';

const isQueryUserIdString = (
  query: string | string[] | undefined
): query is string => typeof query === 'string';

const PDFViewContainer = () => {
  const { query } = useRouter();
  const { i18n } = useTranslation('CVTemplates');
  const { user } = useAuth();
  const { setActiveTemplate, setAllData, getUserData } = usePDFData();

  const userId = isQueryUserIdString(query.userId) ? query.userId : null;
  const isPDFPreview = Boolean(userId);

  useEffect(() => {
    if (isPDFPreview) {
      if (!userId) return;

      getCVPreviewForUser(userId, (data: DocumentPDFData) => {
        setActiveTemplate(data.template.templateName);
        setAllData(data);
        i18n.changeLanguage(data.language);
      });
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [user]);

  return <PDFViewPresenter isPDFPreview={isPDFPreview} />;
};

export default PDFViewContainer;

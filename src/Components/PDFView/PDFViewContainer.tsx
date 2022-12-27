import { usePDF } from '@react-pdf/renderer';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  DocumentPDFData,
  getCVPreviewForUser,
  getDataForUser,
  saveDataForUser,
} from '../../store/actions/syncActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cacheAllData, PDFData } from '../../store/reducers/pdfData';
import PageLoader from '../Shared/Loader/PageLoader';
import CVTemplate from './CVTemplates/CVTemplate';
import PDFViewPresenter from './PDFViewPresenter';
import { PDFViewContext } from './PDFViewProvider';

const PDFView = () => {
  const params = useParams();
  const isPDFPreview = !!params.userId;
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    template,
    setAllData,
    setTemplate,
  } = useContext(PDFViewContext);
  const { t, i18n } = useTranslation('CVTemplates');
  const currentLanguage = i18n.language;

  const dispatch = useAppDispatch();
  const pdfData = useAppSelector(state => state.pdfData);
  const user = useAppSelector(state => state.user.user);

  const [instance, updateInstance] = usePDF({
    document: CVTemplate({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      skills,
      template,
      t,
      currentLanguage,
    }),
  });

  const updateInstanceRef: { current: null | ReturnType<typeof setTimeout> } =
    useRef(null);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();

      if (isPDFPreview) return;

      dispatch(
        cacheAllData({
          generalInfo,
          professionalExperience,
          certificates,
          education,
          languages,
          skills,
        } as PDFData)
      );
      dispatch(saveDataForUser());
    }, 800);
  }, [
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    template,
  ]);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();
    }, 500);
  }, [currentLanguage]);

  useEffect(() => {
    dispatch(getDataForUser());
  }, [user]);

  useEffect(() => {
    if (isPDFPreview) {
      if (!params.userId) return;

      getCVPreviewForUser(params.userId, (data: DocumentPDFData) => {
        setTemplate(data.template);
        setAllData(data);
      });
    }
  }, []);

  return (
    <PageLoader isLoading={pdfData.loading}>
      <PDFViewPresenter pdfInstance={instance} isPDFPreview={isPDFPreview} />
    </PageLoader>
  );
};

export default PDFView;

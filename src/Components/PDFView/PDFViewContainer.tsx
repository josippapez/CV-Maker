import { usePDF } from '@react-pdf/renderer';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import usePDFData from '../../Hooks/usePDFData';
import {
  DocumentPDFData,
  getCVPreviewForUser,
  getDataForUser,
  saveDataForUser,
} from '../../store/actions/syncActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CVTemplate from './CVTemplates/CVTemplate';
import PDFViewPresenter from './PDFViewPresenter';

const PDFView = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector(state => state.user.user.id);
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    template,
    loaded,
    setDataLoaded,
    setActiveTemplate,
    setAllData,
  } = usePDFData();
  const { t, i18n } = useTranslation('CVTemplates');

  const currentLanguage = i18n.language;
  const isPDFPreview = !!params.userId;

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
    if (updateInstanceRef.current) clearTimeout(updateInstanceRef.current);

    updateInstanceRef.current = setTimeout(() => {
      updateInstance();

      if (isPDFPreview) return;

      if (loaded) dispatch(saveDataForUser());
    }, 800);
  }, [
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    template,
    currentLanguage,
  ]);

  useEffect(() => {
    dispatch(getDataForUser());
  }, [user]);

  useEffect(() => {
    if (!instance) return;

    setDataLoaded(!instance.loading);
  }, [instance]);

  useEffect(() => {
    if (isPDFPreview) {
      if (!params.userId) return;

      getCVPreviewForUser(params.userId, (data: DocumentPDFData) => {
        setActiveTemplate(data.template.templateName);
        setAllData(data);
        i18n.changeLanguage(data.language);
      });
    }
  }, []);

  return (
    <PDFViewPresenter pdfInstance={instance} isPDFPreview={isPDFPreview} />
  );
};

export default PDFView;

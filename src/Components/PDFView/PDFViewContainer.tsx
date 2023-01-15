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
    loaded,
    setLoaded,
  } = useContext(PDFViewContext);
  const { t, i18n } = useTranslation('CVTemplates');
  const currentLanguage = i18n.language;

  const dispatch = useAppDispatch();
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
      if (!loaded) {
        setLoaded(true);
      }
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
    currentLanguage
  ]);

  useEffect(() => {
    dispatch(getDataForUser());
  }, [user]);

  useEffect(() => {
    if (isPDFPreview) {
      if (!params.userId) return;

      getCVPreviewForUser(params.userId, (data: DocumentPDFData) => {
        setTemplate(data.template);
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

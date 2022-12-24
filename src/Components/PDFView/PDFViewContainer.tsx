import { usePDF } from '@react-pdf/renderer';
import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
  } = useContext(PDFViewContext);
  const { t, i18n } = useTranslation('CVTemplates');
  const currentLanguage = i18n.language;

  const dispatch = useAppDispatch();
  const pdfData = useAppSelector(state => state.pdfData);
  const template = useAppSelector(state => state.template);
  const user = useAppSelector(state => state.user.user);

  const [instance, updateInstance] = usePDF({
    document: CVTemplate({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      skills,
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
  ]);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();
    }, 500);
  }, [template, currentLanguage]);

  useEffect(() => {
    dispatch(getDataForUser());
  }, [user]);

  return (
    <PageLoader isLoading={pdfData.loading}>
      <PDFViewPresenter pdfInstance={instance} />
    </PageLoader>
  );
};

export default PDFView;

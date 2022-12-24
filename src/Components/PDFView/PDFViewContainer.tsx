import { usePDF } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getDataForUser,
  saveDataForUser,
} from '../../store/actions/syncActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cacheAllData, PDFData } from '../../store/reducers/pdfData';
import PageLoader from '../Shared/Loader/PageLoader';
import CVTemplate from './CVTemplates/CVTemplate';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from './models';
import PDFViewPresenter from './PDFViewPresenter';

const PDFView = () => {
  const { t, i18n } = useTranslation('CVTemplates');
  const currentLanguage = i18n.language;

  const dispatch = useAppDispatch();
  const pdfData = useAppSelector(state => state.pdfData);
  const template = useAppSelector(state => state.template);
  const user = useAppSelector(state => state.user.user);

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    profilePicture: undefined,
    firstName: '',
    lastName: '',
    dob: '',
    aboutMe: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    website: '',
    LinkedIn: '',
    GitHub: '',
    Facebook: '',
    Instagram: '',
    Twitter: '',
  });
  const [professionalExperience, setProfessionalExperience] = useState<
    ProfessionalExperience[]
  >([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<LanguageSkill[]>([]);

  const [instance, updateInstance] = usePDF({
    document: CVTemplate({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
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
        } as PDFData)
      );
      dispatch(saveDataForUser());
    }, 800);
  }, [generalInfo, professionalExperience, certificates, education, languages]);

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

  useEffect(() => {
    if (pdfData) {
      if (pdfData.generalInfo) setGeneralInfo(pdfData.generalInfo);
      if (pdfData.professionalExperience)
        setProfessionalExperience(pdfData.professionalExperience);
      if (pdfData.certificates) setCertificates(pdfData.certificates);
      if (pdfData.education) setEducation(pdfData.education);
      if (pdfData.languages) setLanguages(pdfData.languages);
    }
  }, [pdfData]);

  return (
    <PageLoader isLoading={pdfData.loading}>
      <PDFViewPresenter
        pdfInstance={instance}
        setGeneralInfo={setGeneralInfo}
        generalInfo={generalInfo}
        setProfessionalExperience={setProfessionalExperience}
        professionalExperience={professionalExperience}
        setCertificates={setCertificates}
        certificates={certificates}
        setEducation={setEducation}
        education={education}
        setLanguages={setLanguages}
        languages={languages}
      />
    </PageLoader>
  );
};

export default PDFView;

import { usePDF } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  cacheCertificates,
  cacheEducation,
  cacheGeneralInfo,
  cacheLanguages,
  cacheProfessionalExperience,
  PDFData,
} from '../../store/reducers/pdfData';
import { Template } from '../../store/reducers/template';
import CVTemplate from './CVTemplates/CVTemplate';
import PDFViewPresenter from './PDFViewPresenter';
export interface ProfessionalExperience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}
export interface GeneralInfo {
  profilePicture: string | null;
  firstName: string;
  lastName: string;
  aboutMe: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  website: string;
  LinkedIn: string;
  GitHub: string;
  Facebook: string;
  Instagram: string;
  Twitter: string;
}

export interface Certificate {
  name: string;
  date: string;
  institution: string;
  description: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export enum LanguageProficiencyLevel {
  BEGINNER = 'BEGINNER',
  CONVERSATIONAL = 'CONVERSATIONAL',
  FLUENT = 'FLUENT',
  NATIVE = 'NATIVE',
}

export interface LanguageSkill {
  name: string;
  proficiency: LanguageProficiencyLevel;
}

const PDFView = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const dispatch = useAppDispatch();
  const pdfData: Partial<PDFData> = useAppSelector(state => state.pdfData);
  const template: Template = useAppSelector(state => state.template);

  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>(
    pdfData.generalInfo
      ? pdfData.generalInfo
      : {
          profilePicture: null,
          firstName: '',
          lastName: '',
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
        }
  );
  const [professionalExperience, setProfessionalExperience] = useState<
    ProfessionalExperience[]
  >(
    pdfData?.professionalExperience?.length
      ? pdfData.professionalExperience
      : []
  );
  const [certificates, setCertificates] = useState<Certificate[]>(
    pdfData.certificates?.length ? pdfData.certificates : []
  );
  const [education, setEducation] = useState<Education[]>(
    pdfData.education?.length ? pdfData.education : []
  );
  const [languages, setLanguages] = useState<LanguageSkill[]>(
    pdfData.languages?.length ? pdfData.languages : []
  );

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
      dispatch(cacheGeneralInfo(generalInfo));
      dispatch(cacheProfessionalExperience(professionalExperience));
      dispatch(cacheCertificates(certificates));
      dispatch(cacheEducation(education));
      dispatch(cacheLanguages(languages));
    }, 500);
  }, [generalInfo, professionalExperience, certificates, education, languages]);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();
    }, 500);
  }, [template, currentLanguage]);

  return (
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
  );
};

export default PDFView;

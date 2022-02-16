import { usePDF } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';
import CVTemplate1 from './CVTemplates/CVTemplate1';
import CVTemplate2 from './CVTemplates/CVTemplate2';
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
  BEGINNER = 'Beginner',
  CONVERSATIONAL = 'Conversational',
  FLUENT = 'Fluent',
  NATIVE = 'Native',
}

export interface LanguageSkill {
  name: string;
  proficiency: LanguageProficiencyLevel;
}

const PDFView = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
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
  });
  const [professionalExperience, setProfessionalExperience] = useState<
    ProfessionalExperience[]
  >([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<LanguageSkill[]>([]);

  const [instance, updateInstance] = usePDF({
    document: CVTemplate2({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
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
    }, 500);
  }, [generalInfo, professionalExperience, certificates, education, languages]);

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

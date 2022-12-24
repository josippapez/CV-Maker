// create context for pdf view

import { createContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from './models';

export const PDFViewContext = createContext<{
  generalInfo: GeneralInfo;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience: (
    professionalExperience: ProfessionalExperience[]
  ) => void;
  certificates: Certificate[];
  setCertificates: (certificates: Certificate[]) => void;
  education: Education[];
  setEducation: (education: Education[]) => void;
  languages: LanguageSkill[];
  setLanguages: (languages: LanguageSkill[]) => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
}>({
  generalInfo: {
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
    Twitter: '',
  },
  setGeneralInfo: () => {
    return;
  },
  professionalExperience: [],
  setProfessionalExperience: () => {
    return;
  },
  certificates: [],
  setCertificates: () => {
    return;
  },
  education: [],
  setEducation: () => {
    return;
  },
  languages: [],
  setLanguages: () => {
    return;
  },
  skills: [],
  setSkills: () => {
    return;
  },
});

export const PDFViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pdfData = useAppSelector(state => state.pdfData);

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
    Twitter: '',
  });

  const [professionalExperience, setProfessionalExperience] = useState<
    ProfessionalExperience[]
  >([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<LanguageSkill[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (pdfData) {
      if (pdfData.generalInfo) setGeneralInfo(pdfData.generalInfo);
      if (pdfData.professionalExperience)
        setProfessionalExperience(pdfData.professionalExperience);
      if (pdfData.certificates) setCertificates(pdfData.certificates);
      if (pdfData.education) setEducation(pdfData.education);
      if (pdfData.languages) setLanguages(pdfData.languages);
      if (pdfData.skills) setSkills(pdfData.skills);
    }
  }, [pdfData]);

  return (
    <PDFViewContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        professionalExperience,
        setProfessionalExperience,
        certificates,
        setCertificates,
        education,
        setEducation,
        languages,
        setLanguages,
        skills,
        setSkills,
      }}
    >
      {children}
    </PDFViewContext.Provider>
  );
};

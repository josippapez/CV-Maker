// create context for pdf view

import { createContext, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Template, TemplateName } from '../../store/reducers/template';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Skill,
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
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  template: Template;
  setTemplate: (template: Template) => void;
  setAllData: (data: {
    generalInfo: GeneralInfo;
    professionalExperience: ProfessionalExperience[];
    certificates: Certificate[];
    education: Education[];
    languages: LanguageSkill[];
    skills: Skill[];
    template: Template;
  }) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
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
  template: {
    templateName: TemplateName.CVTemplate1,
  },
  setTemplate: () => {
    return;
  },
  setAllData: () => {
    return;
  },
  loaded: false,
  setLoaded: () => {
    return;
  },
});

export const PDFViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pdfData = useAppSelector(state => state.pdfData);
  const templateData = useAppSelector(state => state.template);

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
  const [skills, setSkills] = useState<Skill[]>([]);
  const [template, setTemplate] = useState<Template>({
    templateName: TemplateName.CVTemplate1,
  });
  const [loaded, setLoaded] = useState(false);

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
    if (templateData) {
      if (templateData.templateName) setTemplate(templateData);
    }
  }, [pdfData, templateData]);

  const setAllData = (data: {
    generalInfo: GeneralInfo;
    professionalExperience: ProfessionalExperience[];
    certificates: Certificate[];
    education: Education[];
    languages: LanguageSkill[];
    skills: Skill[];
    template: Template;
  }) => {
    setGeneralInfo(data.generalInfo);
    setProfessionalExperience(data.professionalExperience);
    setCertificates(data.certificates);
    setEducation(data.education);
    setLanguages(data.languages);
    setSkills(data.skills);
    setTemplate(data.template);
  };

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
        template,
        setTemplate,
        setAllData,
        loaded,
        setLoaded,
      }}
    >
      {children}
    </PDFViewContext.Provider>
  );
};

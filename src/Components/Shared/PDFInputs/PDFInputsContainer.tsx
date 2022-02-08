import { useEffect, useState } from 'react';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from '../../PDFView/PDFViewContainer';
import PDFInputsPresenter from './PDFInputsPresenter';

type Props = {
  setGeneralInfo(generalInfo: GeneralInfo): void;
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience(
    professionalExperience: ProfessionalExperience[]
  ): void;
  certificates: Certificate[];
  setCertificates(certificates: Certificate[]): void;
  education: Education[];
  setEducation(education: Education[]): void;
  languages: LanguageSkill[];
  setLanguages(languages: LanguageSkill[]): void;
};

export enum Tab {
  generalInfo = 'generalInfo',
  professionalExperience = 'professionalExperience',
  certificates = 'certificates',
  education = 'education',
  languages = 'languages',
}

const PDFInputsContainer = (props: Props) => {
  const {
    setGeneralInfo,
    generalInfo,
    professionalExperience,
    setProfessionalExperience,
    certificates,
    setCertificates,
    education,
    setEducation,
    languages,
    setLanguages,
  } = props;

  const [selectedTab, setSelectedTab] = useState<Tab>(
    localStorage.getItem('selectedTab') !== 'null' &&
      localStorage.getItem('selectedTab') !== null &&
      localStorage.getItem('selectedTab') !== undefined
      ? Tab[localStorage.getItem('selectedTab') as keyof typeof Tab]
      : Tab.generalInfo
  );

  const setSelectedTabHandler = (tab: Tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [setSelectedTab, selectedTab]);

  return (
    <PDFInputsPresenter
      generalInfo={generalInfo}
      setGeneralInfo={setGeneralInfo}
      professionalExperience={professionalExperience}
      setProfessionalExperience={setProfessionalExperience}
      certificates={certificates}
      setCertificates={setCertificates}
      educations={education}
      setEducation={setEducation}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTabHandler}
      languages={languages}
      setLanguages={setLanguages}
    />
  );
};

export default PDFInputsContainer;

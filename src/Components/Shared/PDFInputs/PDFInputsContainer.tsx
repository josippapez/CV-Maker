import { useEffect, useState } from 'react';
import { Input, ProfessionalExperience } from '../../PDFView/PDFViewContainer';
import PDFInputsPresenter from './PDFInputsPresenter';

type Props = {
  setGeneralInfo(generalInfo: Input): void;
  generalInfo: Input;
  updateInstance(): void;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience(
    professionalExperience: ProfessionalExperience[]
  ): void;
};

export enum Tab {
  generalInfo = 'generalInfo',
  professionalExperience = 'professionalExperience',
  certificates = 'certificates',
  education = 'education',
}

const PDFInputsContainer = (props: Props) => {
  const {
    setGeneralInfo,
    generalInfo,
    updateInstance,
    professionalExperience,
    setProfessionalExperience,
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
      updateInstance={updateInstance}
      professionalExperience={professionalExperience}
      setProfessionalExperience={setProfessionalExperience}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTabHandler}
    />
  );
};

export default PDFInputsContainer;

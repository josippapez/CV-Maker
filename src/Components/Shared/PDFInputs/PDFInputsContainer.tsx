import { useState } from 'react';
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
}

const PDFInputsContainer = (props: Props) => {
  const {
    setGeneralInfo,
    generalInfo,
    updateInstance,
    professionalExperience,
    setProfessionalExperience,
  } = props;
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.generalInfo);

  const setSelectedTabHandler = (tab: Tab) => {
    setSelectedTab(tab);
  };

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

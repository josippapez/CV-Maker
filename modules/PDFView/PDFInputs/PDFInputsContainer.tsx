import { PDFInputsPresenter } from '@modules/PDFView/PDFInputs/PDFInputsPresenter';
import { useEffect, useState } from 'react';

export enum Tab {
  generalInfo = 'generalInfo',
  professionalExperience = 'professionalExperience',
  certificates = 'certificates',
  education = 'education',
  languages = 'languages',
  skills = 'skills',
  projects = 'projects',
}

export const PDFInputsContainer = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(
    localStorage.getItem('selectedTab') !== 'null' &&
      localStorage.getItem('selectedTab') !== null &&
      localStorage.getItem('selectedTab') !== undefined
      ? Tab[localStorage.getItem('selectedTab') as keyof typeof Tab]
      : Tab.generalInfo
  );

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [setSelectedTab, selectedTab]);

  return (
    <PDFInputsPresenter
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    />
  );
};

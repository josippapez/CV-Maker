import { CertificatesInput } from '@modules/PDFView/PDFInputs/Components/CertificatesInput';
import { EducationInput } from '@modules/PDFView/PDFInputs/Components/EducationInput';
import { GeneralInput } from '@modules/PDFView/PDFInputs/Components/GeneralInput';
import { LanguagesInput } from '@modules/PDFView/PDFInputs/Components/LanguagesInput';
import { ProfessionalExperienceInput } from '@modules/PDFView/PDFInputs/Components/ProfessionalExperienceInput';
import { ProjectsInput } from '@modules/PDFView/PDFInputs/Components/ProjectsInput';
import { SkillsInput } from '@modules/PDFView/PDFInputs/Components/SkillsInput';
import { Tab } from '@modules/PDFView/PDFInputs/PDFInputsContainer';
import { PDFTabNavigationPresenter } from '@modules/PDFView/PDFTabNavigation/PDFTabNavigationPresenter';
import { useCallback } from 'react';

type Props = {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
};

export const PDFInputsPresenter = (props: Props) => {
  const { setSelectedTab, selectedTab } = props;

  const getInputs = useCallback(() => {
    switch (selectedTab) {
      case Tab.generalInfo:
        return <GeneralInput key={selectedTab} />;
      case Tab.professionalExperience:
        return <ProfessionalExperienceInput key={selectedTab} />;
      case Tab.projects:
        return <ProjectsInput key={selectedTab} />;
      case Tab.education:
        return <EducationInput key={selectedTab} />;
      case Tab.certificates:
        return <CertificatesInput key={selectedTab} />;
      case Tab.languages:
        return <LanguagesInput key={selectedTab} />;
      case Tab.skills:
        return <SkillsInput key={selectedTab} />;
    }
  }, [selectedTab]);

  return (
    <div className='flex w-full flex-row'>
      <PDFTabNavigationPresenter
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <div className='page-container desktop_col-28 mobile_col-16 flex-grow overflow-y-scroll rounded-md bg-[#f7f7f7] py-10 dark:bg-transparent'>
        {getInputs()}
      </div>
    </div>
  );
};

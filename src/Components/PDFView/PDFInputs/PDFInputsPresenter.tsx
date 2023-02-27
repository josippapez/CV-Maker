import { AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import PDFTabNavigationPresenter from '../PDFTabNavigation/PDFTabNavigationPresenter';
import {
  CertificatesInput,
  EducationInput,
  GeneralInput,
  LanguagesInput,
  ProfessionalExperienceInput,
  SkillsInput,
} from './Components';
import { Tab } from './PDFInputsContainer';

type Props = {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
};

const PDFInputsPresenter = (props: Props) => {
  const { setSelectedTab, selectedTab } = props;

  const getInputs = useCallback(() => {
    switch (selectedTab) {
      case Tab.generalInfo:
        return <GeneralInput key={selectedTab} />;
      case Tab.professionalExperience:
        return <ProfessionalExperienceInput key={selectedTab} />;
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
    <div className='flex h-full w-full flex-row'>
      <PDFTabNavigationPresenter
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <CustomScroll flex={1} allowOuterScroll>
        <div className='min-h-full bg-[#f7f7f7] p-10'>
          <AnimatePresence mode='wait'>{getInputs()}</AnimatePresence>
        </div>
      </CustomScroll>
    </div>
  );
};

export default PDFInputsPresenter;

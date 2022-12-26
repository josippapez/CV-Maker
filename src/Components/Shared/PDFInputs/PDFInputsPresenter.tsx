import { AnimatePresence } from 'framer-motion';
import Scrollbars from 'react-custom-scrollbars';
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

  const getInputs = () => {
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
  };

  return (
    <div className='flex flex-row h-full w-full'>
      <PDFTabNavigationPresenter
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <Scrollbars autoHide>
        <div className='w-full min-h-full p-10 bg-[#f7f7f7]'>
          <AnimatePresence mode='wait'>{getInputs()}</AnimatePresence>
        </div>
      </Scrollbars>
    </div>
  );
};

export default PDFInputsPresenter;

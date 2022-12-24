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

  return (
    <div className='flex flex-row h-full w-full'>
      <PDFTabNavigationPresenter
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <Scrollbars autoHide>
        <div className='w-full min-h-full p-10 bg-[#f7f7f7]'>
          <GeneralInput selectedTab={selectedTab === Tab.generalInfo} />
          <ProfessionalExperienceInput
            selectedTab={selectedTab === Tab.professionalExperience}
          />
          <EducationInput selectedTab={selectedTab === Tab.education} />
          <CertificatesInput selectedTab={selectedTab === Tab.certificates} />
          <LanguagesInput selectedTab={selectedTab === Tab.languages} />
          <SkillsInput selectedTab={selectedTab === Tab.skills} />
        </div>
      </Scrollbars>
    </div>
  );
};

export default PDFInputsPresenter;

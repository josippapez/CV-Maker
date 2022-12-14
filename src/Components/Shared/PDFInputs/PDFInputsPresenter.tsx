import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from '../../PDFView/models';
import PDFTabNavigation from '../PDFTabNavigation/PDFTabNavigationContainer';
import {
  CertificatesInput,
  EducationInput,
  GeneralInput,
  LanguagesInput,
  ProfessionalExperienceInput,
} from './Components';
import { Tab } from './PDFInputsContainer';

type Props = {
  generalInfo: GeneralInfo;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience: (
    professionalExperience: ProfessionalExperience[]
  ) => void;
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
  certificates: Certificate[];
  setCertificates: (certificates: Certificate[]) => void;
  educations: Education[];
  setEducation: (education: Education[]) => void;
  languages: LanguageSkill[];
  setLanguages: (languages: LanguageSkill[]) => void;
};

const PDFInputsPresenter = (props: Props) => {
  const { t } = useTranslation();
  const {
    generalInfo,
    setGeneralInfo,
    professionalExperience,
    setProfessionalExperience,
    setSelectedTab,
    selectedTab,
    certificates,
    setCertificates,
    educations,
    setEducation,
    languages,
    setLanguages,
  } = props;

  return (
    <div className='flex flex-row h-full'>
      <PDFTabNavigation
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <Scrollbars autoHide>
        <div className='w-full min-h-full px-4 py-8 bg-[#f7f7f7]'>
          <GeneralInput
            generalInfo={generalInfo}
            setGeneralInfo={setGeneralInfo}
            selectedTab={selectedTab === Tab.generalInfo}
          />
          <ProfessionalExperienceInput
            professionalExperience={professionalExperience}
            setProfessionalExperience={setProfessionalExperience}
            selectedTab={selectedTab === Tab.professionalExperience}
          />
          <CertificatesInput
            certificates={certificates}
            setCertificates={setCertificates}
            selectedTab={selectedTab === Tab.certificates}
          />
          <EducationInput
            educations={educations}
            setEducation={setEducation}
            selectedTab={selectedTab === Tab.education}
          />
          <LanguagesInput
            languages={languages}
            setLanguages={setLanguages}
            selectedTab={selectedTab === Tab.languages}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default PDFInputsPresenter;

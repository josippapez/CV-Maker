import { Certificate, Education, GeneralInfo, LanguageSkill, ProfessionalExperience } from '../../PDFView/PDFViewContainer';
import { Tab } from './PDFInputsContainer';
declare type Props = {
    generalInfo: GeneralInfo;
    setGeneralInfo: (generalInfo: GeneralInfo) => void;
    professionalExperience: ProfessionalExperience[];
    setProfessionalExperience: (professionalExperience: ProfessionalExperience[]) => void;
    selectedTab: Tab;
    setSelectedTab: (tab: Tab) => void;
    certificates: Certificate[];
    setCertificates: (certificates: Certificate[]) => void;
    educations: Education[];
    setEducation: (education: Education[]) => void;
    languages: LanguageSkill[];
    setLanguages: (languages: LanguageSkill[]) => void;
};
declare const PDFInputsPresenter: (props: Props) => JSX.Element;
export default PDFInputsPresenter;

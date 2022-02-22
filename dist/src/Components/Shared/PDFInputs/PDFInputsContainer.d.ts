import { Certificate, Education, GeneralInfo, LanguageSkill, ProfessionalExperience } from '../../PDFView/PDFViewContainer';
declare type Props = {
    setGeneralInfo(generalInfo: GeneralInfo): void;
    generalInfo: GeneralInfo;
    professionalExperience: ProfessionalExperience[];
    setProfessionalExperience(professionalExperience: ProfessionalExperience[]): void;
    certificates: Certificate[];
    setCertificates(certificates: Certificate[]): void;
    education: Education[];
    setEducation(education: Education[]): void;
    languages: LanguageSkill[];
    setLanguages(languages: LanguageSkill[]): void;
};
export declare enum Tab {
    generalInfo = "generalInfo",
    professionalExperience = "professionalExperience",
    certificates = "certificates",
    education = "education",
    languages = "languages"
}
declare const PDFInputsContainer: (props: Props) => JSX.Element;
export default PDFInputsContainer;

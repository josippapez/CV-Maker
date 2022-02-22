import { Certificate, Education, GeneralInfo, LanguageSkill, ProfessionalExperience } from './PDFViewContainer';
import './PDFViewPresenter.css';
declare type Props = {
    pdfInstance: {
        loading: boolean;
        blob: Blob | null;
        url: string | null;
        error: string | null;
    };
    setGeneralInfo(generalInfo: GeneralInfo): void;
    generalInfo: GeneralInfo;
    setProfessionalExperience(professionalExperience: ProfessionalExperience[]): void;
    professionalExperience: ProfessionalExperience[];
    certificates: Certificate[];
    education: Education[];
    setCertificates(certificates: Certificate[]): void;
    setEducation(education: Education[]): void;
    languages: LanguageSkill[];
    setLanguages(languages: LanguageSkill[]): void;
};
declare const PDFViewPresenter: (props: Props) => JSX.Element;
export default PDFViewPresenter;

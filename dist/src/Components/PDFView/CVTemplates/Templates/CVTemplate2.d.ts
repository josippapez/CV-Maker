import { Certificate, Education, GeneralInfo, LanguageSkill, ProfessionalExperience } from '../../PDFViewContainer';
declare type Props = {
    generalInfo?: GeneralInfo;
    professionalExperience?: ProfessionalExperience[];
    certificates?: Certificate[];
    education?: Education[];
    languages?: LanguageSkill[];
};
declare const CVTemplate2: (props: Props) => JSX.Element;
export default CVTemplate2;

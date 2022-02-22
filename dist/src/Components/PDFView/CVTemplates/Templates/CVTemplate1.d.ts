import { Certificate, Education, GeneralInfo, LanguageSkill, ProfessionalExperience } from '../../PDFViewContainer';
declare type Props = {
    generalInfo?: GeneralInfo;
    professionalExperience?: ProfessionalExperience[];
    certificates?: Certificate[];
    education?: Education[];
    languages?: LanguageSkill[];
};
declare const CVTemplate1: (props: Props) => JSX.Element;
export default CVTemplate1;

import { Template } from '@/store/reducers/template';
import { Certificate } from '@modules/PDFView/models/Certificate';
import { Education } from '@modules/PDFView/models/Education';
import { GeneralInfo } from '@modules/PDFView/models/GeneralInfo';
import { LanguageSkill } from '@modules/PDFView/models/LanguageSkill';
import { ProfessionalExperience } from '@modules/PDFView/models/ProfessionalExperience';
import { Project } from '@modules/PDFView/models/Project';
import { Skill } from '@modules/PDFView/models/Skill';

export type PDFData = {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  template: Template;
  skills: Skill[];
  projects: Project[];
};

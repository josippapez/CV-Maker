import { TFunction } from 'i18next';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Project,
  Skill,
} from '../../models';

export interface DefaultProps {
  generalInfo?: GeneralInfo;
  professionalExperience?: ProfessionalExperience[];
  certificates?: Certificate[];
  education?: Education[];
  languages?: LanguageSkill[];
  projects?: Project[];
  skills: Skill[];
  translate: TFunction;
}

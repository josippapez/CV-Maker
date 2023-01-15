import { TFunction } from 'react-i18next';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Skill,
} from '../../models';

export interface DefaultProps {
  generalInfo?: GeneralInfo;
  professionalExperience?: ProfessionalExperience[];
  certificates?: Certificate[];
  education?: Education[];
  languages?: LanguageSkill[];
  skills: Skill[];
  translate: TFunction;
  locale: string;
}

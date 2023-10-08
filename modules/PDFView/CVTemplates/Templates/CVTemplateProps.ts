import { useTranslations } from 'next-intl';
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
  translate: ReturnType<typeof useTranslations<string>>;
}

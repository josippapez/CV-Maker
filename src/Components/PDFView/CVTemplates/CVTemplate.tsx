import { useMemo } from 'react';
import { TFunction } from 'react-i18next';
import { useAppSelector } from '../../../store/hooks';
import { TemplateName } from '../../../store/reducers/template';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from '../models';
import CVTemplate1 from './Templates/CVTemplate1';
import CVTemplate2 from './Templates/CVTemplate2';
import CVTemplate3 from './Templates/CVTemplate3';
import CVTemplate4 from './Templates/CVTemplate4';

type OptionType = {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  skills: string[];
  translate: TFunction;
};

type Props = {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  t: TFunction;
  currentLanguage: string;
  skills: string[];
};

const getTemplate = (templateName: TemplateName, options: OptionType) => {
  switch (templateName) {
    case TemplateName.CVTemplate1:
      return <CVTemplate1 {...options} />;
    case TemplateName.CVTemplate2:
      return <CVTemplate2 {...options} />;
    case TemplateName.CVTemplate3:
      return <CVTemplate3 {...options} />;
    case TemplateName.CVTemplate4:
      return <CVTemplate4 {...options} />;
    default:
      return <CVTemplate1 {...options} />;
  }
};

const CVTemplate = (props: Props): JSX.Element => {
  const {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    t,
    currentLanguage,
  } = props;

  const template = useAppSelector(state => state.template);
  const options: OptionType = {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    translate: t,
  };

  return useMemo(
    () => getTemplate(template.templateName, options),
    [
      template,
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      currentLanguage,
      skills,
    ]
  );
};

export default CVTemplate;

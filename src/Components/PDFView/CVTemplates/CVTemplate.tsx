import { TFunction } from 'react-i18next';
import { useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { TemplateName } from '../../../store/reducers/template';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from '../PDFViewContainer';
import CVTemplate1 from './Templates/CVTemplate1';
import CVTemplate2 from './Templates/CVTemplate2';

type Props = {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  t: TFunction;
  currentLanguage: string;
};

const getTemplate = (templateName: TemplateName) => {
  switch (templateName) {
    case TemplateName.CVTemplate1:
      return CVTemplate1;
    case TemplateName.CVTemplate2:
      return CVTemplate2;
    default:
      return CVTemplate1;
  }
};

const CVTemplate = (props: Props): JSX.Element => {
  const {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    t,
    currentLanguage,
  } = props;

  const template = useAppSelector(state => state.template);
  const options = {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    translate: t,
  };

  return useMemo(
    () => getTemplate(template.templateName)(options),
    [
      template,
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      currentLanguage,
    ]
  );
};

export default CVTemplate;

import { Template, TemplateName } from '@/store/reducers/template';
import { CVTemplate1 } from '@modules/PDFView/CVTemplates/Templates/CVTemplate1';
import { CVTemplate2 } from '@modules/PDFView/CVTemplates/Templates/CVTemplate2';
import { CVTemplate3 } from '@modules/PDFView/CVTemplates/Templates/CVTemplate3';
import { CVTemplate4 } from '@modules/PDFView/CVTemplates/Templates/CVTemplate4';
import { registerFonts } from '@modules/PDFView/CVTemplates/Templates/Utils';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Skill,
} from '@modules/PDFView/models';
import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type OptionType = {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  skills: Skill[];
  template: Template;
  translate: TFunction;
};

type Props = {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  template: Template;
  skills: Skill[];
};

function isNever(template: never): never {
  throw new Error(`Unexpected Template: ${template}`);
}

export const getTemplate = (
  templateName: TemplateName,
  options: OptionType
) => {
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
      return isNever(templateName);
  }
};

export const CVTemplate = (props: Props): JSX.Element => {
  const { t } = useTranslation('CVTemplates');
  const {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    template,
  } = props;

  const options: OptionType = {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    template,
    translate: t,
  };

  useMemo(() => {
    registerFonts(template.templateName);
  }, [template.templateName]);

  return useMemo(
    () => getTemplate(template.templateName, options),
    [
      template,
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      skills,
    ]
  );
};

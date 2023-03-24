import { Template, TemplateName } from '@/store/reducers/template';
import { Template1 } from '@modules/PDFView/CVTemplates/Templates/Template1';
import { Template2 } from '@modules/PDFView/CVTemplates/Templates/Template2';
import { Template3 } from '@modules/PDFView/CVTemplates/Templates/Template3';
import { Template4 } from '@modules/PDFView/CVTemplates/Templates/Template4';
import { registerFonts } from '@modules/PDFView/CVTemplates/Templates/Utils';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Project,
  Skill,
} from '@modules/PDFView/models';
import { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  template: Template;
  skills: Skill[];
  projects: Project[];
  isHtml?: boolean;
}

interface OptionType extends Props {
  translate: TFunction;
}

function isNever(template: never): never {
  throw new Error(`Unexpected Template: ${template}`);
}

export const getTemplate = (
  templateName: TemplateName,
  options: OptionType
) => {
  switch (templateName) {
    case TemplateName.CVTemplate1:
      return <Template1 {...options} />;
    case TemplateName.CVTemplate2:
      return <Template2 {...options} />;
    case TemplateName.CVTemplate3:
      return <Template3 {...options} />;
    case TemplateName.CVTemplate4:
      return <Template4 {...options} />;
    default:
      return isNever(templateName);
  }
};

export const CVTemplate = (props: Props): JSX.Element => {
  const { t } = useTranslation('CVTemplates');
  const { template } = props;

  const options: OptionType = {
    ...props,
    translate: t,
  };

  useMemo(() => {
    registerFonts(template.templateName);
  }, [template.templateName]);

  return useMemo(
    () => getTemplate(template.templateName, options),
    [template, ...Object.values(props)]
  );
};

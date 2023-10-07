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
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

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
  translate: ReturnType<typeof useTranslations<string>>;
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
  const t = useTranslations('Templates');
  const { template } = props;

  const options: OptionType = useMemo(() => {
    return {
      ...props,
      translate: t,
    };
  }, []);

  useMemo(() => {
    registerFonts(template.templateName);
  }, [template.templateName]);

  return useMemo(
    () => getTemplate(template.templateName, options),
    [template, ...Object.values(props)]
  );
};

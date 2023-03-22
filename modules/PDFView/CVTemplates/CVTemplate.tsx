import { Template, TemplateName } from '@/store/reducers/template';
import { Document } from '@modules/PDFView/CVTemplates/Templates/Components';
import { Template1 } from '@modules/PDFView/CVTemplates/Templates/Template/Template1';
import { Template2 } from '@modules/PDFView/CVTemplates/Templates/Template/Template2';
import { Template3 } from '@modules/PDFView/CVTemplates/Templates/Template/Template3';
import { Template4 } from '@modules/PDFView/CVTemplates/Templates/Template/Template4';
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
      return (
        <Document>
          <Template1 {...options} />
        </Document>
      );
    case TemplateName.CVTemplate2:
      return (
        <Document>
          <Template2 {...options} />
        </Document>
      );
    case TemplateName.CVTemplate3:
      return (
        <Document>
          <Template3 {...options} />
        </Document>
      );
    case TemplateName.CVTemplate4:
      return (
        <Document>
          <Template4 {...options} />
        </Document>
      );
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

  return getTemplate(template.templateName, options);
};

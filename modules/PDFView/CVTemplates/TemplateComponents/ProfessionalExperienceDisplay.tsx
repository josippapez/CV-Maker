import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { ComponentProps } from '@modules/PDFView/CVTemplates/TemplateComponents/models/ComponentProps';
import { View } from '@modules/PDFView/CVTemplates/Templates/Components';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import { ProfessionalExperience } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { TFunction } from 'next-i18next';
import { FC } from 'react';

interface Props extends ComponentProps {
  styles: ReturnType<typeof StyleSheet.create>;
  professionalExperience?: ProfessionalExperience[];
  translate: TFunction;
  showBorder?: boolean;
  borderColor?: string;
}

export const ProfessionalExperienceDisplay: FC<Props> = ({
  styles,
  professionalExperience,
  translate,
  backgroundColor,
  color = 'black',
  showBorder = false,
  borderColor = '#d8d8d8',
}) => {
  if (!professionalExperience || professionalExperience.length === 0)
    return null;

  return (
    <View
      style={[
        styles.paddingY20,
        styles.paddingX40,
        styles.column,
        {
          flexGrow: 1,
          flexShrink: 0,
          backgroundColor,
          color,
        },
      ]}
    >
      <TextDisplay style={[styles.sectionTitle]}>
        {translate('professionalExperience')}
      </TextDisplay>
      {professionalExperience.map((experience, index) => (
        <View
          wrap={false}
          key={index}
          style={[
            styles.row,
            styles.paddingY10,
            {
              borderTop: showBorder
                ? index === 0
                  ? 'none'
                  : `1px solid ${borderColor}`
                : 'none',
            },
          ]}
        >
          <View style={[styles.column, { width: '50%' }]}>
            <TextDisplay style={[styles.name]}>
              {experience.company}
            </TextDisplay>
            <TextDisplay style={[styles.duration, { marginTop: 5 }]}>
              {experience.startDate && displayDate(experience.startDate)} -{' '}
              {experience.currentlyEnrolled
                ? translate('present')
                : experience.endDate && displayDate(experience.endDate)}
            </TextDisplay>
            <TextDisplay style={[styles.location]}>
              {experience.location}
            </TextDisplay>
          </View>

          <View style={[styles.column, styles.paddingX20, { width: '50%' }]}>
            <TextDisplay style={[styles.companyPosition]}>
              {experience.position}
            </TextDisplay>
            <TextDisplay style={{ marginTop: 10 }}>
              {experience.description}
            </TextDisplay>
          </View>
        </View>
      ))}
    </View>
  );
};

import { EducationItem } from '@modules/PDFView/CVTemplates/TemplateComponents/EducationItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { View } from '@modules/PDFView/CVTemplates/Templates/Components';
import { Education } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = {
  education?: Education[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: ReturnType<typeof useTranslations<string>>;
  wrapperStyle?: Style;
};

export const Educations: FC<Props> = ({
  education,
  defaultStyles: styles,
  translate,
  wrapperStyle = {},
}) => {
  if (!education || education.length === 0) return null;

  return (
    <View
      wrap={false}
      style={[
        styles.paddingY20,
        styles.paddingX20,
        styles.column,
        wrapperStyle,
      ]}
    >
      <TextDisplay style={[styles.sectionTitle]}>
        {translate('education')}
      </TextDisplay>
      {education.map((edu, index) => (
        <EducationItem
          edu={edu}
          styles={styles}
          translate={translate}
          key={index}
        />
      ))}
    </View>
  );
};

import { EducationItem } from '@modules/PDFView/CVTemplates/TemplateComponents/EducationItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { Education } from '@modules/PDFView/models';
import { StyleSheet, View } from '@react-pdf/renderer';
import { TFunction } from 'next-i18next';
import { FC } from 'react';

type Props = {
  education?: Education[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: TFunction;
};

export const Educations: FC<Props> = ({
  education,
  defaultStyles: styles,
  translate,
}) => {
  if (!education || education.length === 0) return null;

  return (
    <View style={[styles.paddingY20, styles.paddingX20, styles.column]}>
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

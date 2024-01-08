import { EducationItem } from '@modules/PDFView/CVTemplates/TemplateComponents/EducationItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { Education } from '@modules/PDFView/models';
import { View } from '@rawwee/react-pdf-html';
import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { useTranslations } from 'next-intl';

type Props = {
  education?: Education[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: ReturnType<typeof useTranslations<string>>;
  wrapperStyle?: Style;
};

export const Educations = ({
  education,
  defaultStyles: styles,
  translate,
  wrapperStyle = {},
}: Props) => {
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

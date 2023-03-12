import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { ComponentProps } from '@modules/PDFView/CVTemplates/TemplateComponents/models/ComponentProps';
import { LanguageSkill } from '@modules/PDFView/models';
import { StyleSheet, View } from '@react-pdf/renderer';
import { TFunction } from 'next-i18next';
import { FC } from 'react';

interface Props extends ComponentProps {
  languages?: LanguageSkill[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: TFunction;
  flexGrow?: number;
}

const languageStyles = StyleSheet.create({
  languageCard: {
    width: 'auto',
    height: 'auto',
    margin: '0 10px 10px 0',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#818181',
    padding: '5px 15px',
  },
  languageName: {
    fontSize: 11,
    fontWeight: 'normal',
  },
  languageLevel: {
    fontSize: 11,
    fontWeight: 'extralight',
  },
});

export const Languages: FC<Props> = ({
  languages,
  defaultStyles: styles,
  translate,
  backgroundColor,
  flexGrow = 5,
  color = 'black',
}) => {
  if (!languages || languages.length === 0) return null;

  const combinedStyles = {
    ...languageStyles,
    ...styles,
  };

  return (
    <View
      wrap={false}
      style={[
        styles.paddingY20,
        styles.paddingX40,
        {
          backgroundColor,
          flexGrow,
          color,
        },
      ]}
    >
      <View>
        <TextDisplay
          style={[
            styles.sectionTitle,
            {
              marginBottom: 10,
            },
          ]}
        >
          {translate('languages')}
        </TextDisplay>
      </View>
      <View
        style={[
          styles.row,
          {
            flexWrap: 'wrap',
          },
        ]}
      >
        {languages.map((lang, index) => (
          <View
            key={index}
            style={[styles.column, combinedStyles.languageCard]}
          >
            <TextDisplay style={[combinedStyles.languageName]}>
              {lang.name}
            </TextDisplay>
            <TextDisplay style={[combinedStyles.languageLevel]}>
              {translate(lang.proficiency)}
            </TextDisplay>
          </View>
        ))}
      </View>
    </View>
  );
};

import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { View } from '@modules/PDFView/CVTemplates/Templates/Components';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import { Education } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = {
  edu: Education;
  styles: ReturnType<typeof StyleSheet.create>;
  translate: ReturnType<typeof useTranslations<string>>;
};

const educationStyles = StyleSheet.create({
  educationSchool: {
    fontSize: 11,
    marginBottom: 5,
    fontWeight: 'medium',
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'extralight',
  },
  educationLocation: {
    fontSize: 11,
    fontWeight: 'extralight',
  },
  educationDescription: {
    marginTop: 10,
  },
});

export const EducationItem: FC<Props> = ({ edu, styles, translate }) => {
  return (
    <View style={[styles.column, styles.paddingY10]}>
      <View style={[styles.column]}>
        <TextDisplay style={[educationStyles.educationSchool]}>
          {edu.course ? edu.course : edu.school}
        </TextDisplay>
        <TextDisplay style={[styles.duration]}>
          {edu.startDate && displayDate(edu.startDate)} -{' '}
          {edu.currentlyEnrolled
            ? translate('present')
            : edu.endDate && displayDate(edu.endDate)}
        </TextDisplay>
        <TextDisplay style={[educationStyles.educationDegree]}>
          {`${edu.degree} ${edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}`}
        </TextDisplay>
        {/* {edu.url && edu.url !== '' && (
          <Link
            src={edu.url}
            style={{
              textDecoration: 'none',
            }}
          >
            <Text style={[educationStyles.educationDegree, { color: 'black' }]}>
              {edu.url.replace(/(^\w+:|^)\/\//, '').replace(/(^www\.)/, '')}
            </Text>
          </Link>
        )} */}
        <TextDisplay style={[educationStyles.educationLocation]}>
          {edu.location}
        </TextDisplay>
        <TextDisplay style={[educationStyles.educationDescription]}>
          {edu.description}
        </TextDisplay>
      </View>
    </View>
  );
};

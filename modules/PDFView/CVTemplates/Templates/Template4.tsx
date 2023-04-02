import {
  Certificates,
  Educations,
  Languages,
  PersonalInfo,
  ProfessionalExperienceDisplay,
  Projects,
  SplitView,
} from '@modules/PDFView/CVTemplates/TemplateComponents';
import { DefaultProps } from '@modules/PDFView/CVTemplates/Templates/CVTemplateProps';
import {
  Document,
  Page,
} from '@modules/PDFView/CVTemplates/Templates/Components';
import { StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';

interface Props extends DefaultProps {
  isHtml?: boolean;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#13171a',
    fontFamily: 'Unbounded',
    fontWeight: 'light',
    fontSize: 10,
    color: 'white',
    lineHeight: 2
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  lightGrayText: {
    color: '#818181',
  },
  marginY20: {
    marginTop: 20,
    marginBottom: 20,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop5: {
    marginTop: 5,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  padding20: {
    padding: 20,
  },
  padding40: {
    padding: 40,
  },
  padding60: {
    padding: 60,
  },
  paddingX20: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paddingX40: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  paddingY20: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  paddingY40: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  paddingY10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  paddingX10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  personalInfo: {
    maxHeight: 400,
    height: 'auto',
    minHeight: 150,
    overflow: 'hidden',
  },
  topBar: {
    height: 'auto',
    flexDirection: 'row',
    color: 'white',
  },
  profilePicture: {
    width: 'auto',
    marginRight: 40,
  },
  topBarName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topBarPosition: {
    marginTop: 10,
    fontSize: 14,
  },
  topBarText: {
    marginTop: 10,
    fontSize: 10,
  },
  additionalInfoBar: {
    height: 'auto',
    color: 'white',
  },
  additionalInfoBarText: {
    marginLeft: 20,
    textDecoration: 'none',
    color: 'white',
  },
  name: {
    fontSize: 12,
    fontWeight: 'medium',
  },
  location: {
    fontSize: 11,
    marginTop: 0,
    fontWeight: 'extralight',
  },
  duration: {
    fontSize: 11,
    fontWeight: 'light',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'light',
    color: '#404040',
    paddingBottom: 10,
  },
});

export const Template4: FC<Props> = ({
  generalInfo,
  skills,
  professionalExperience,
  projects,
  education,
  certificates,
  languages,
  translate,
  isHtml,
}) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <PersonalInfo
          styles={styles}
          generalInfo={generalInfo}
          skills={skills}
        />
        <ProfessionalExperienceDisplay
          styles={styles}
          translate={translate}
          professionalExperience={professionalExperience}
          backgroundColor='#E0E0E0'
          showBorder
        />
        <Projects
          defaultStyles={styles}
          translate={translate}
          projects={projects}
          backgroundColor='#e8e8e8'
          color='black'
        />
        <SplitView
          Component1={Educations({
            defaultStyles: styles,
            translate,
            education: education,
          })}
          Component2={Certificates({
            defaultStyles: styles,
            translate,
            certificateList: certificates,
          })}
        />
        <Languages
          defaultStyles={styles}
          translate={translate}
          languages={languages}
          backgroundColor='#ededed'
        />
      </Page>
    </Document>
  );
};

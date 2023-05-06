import {
  AdditionalInformation,
  Certificates,
  Educations,
  Projects,
  TextDisplay,
} from '@modules/PDFView/CVTemplates/TemplateComponents';
import { DefaultProps } from '@modules/PDFView/CVTemplates/Templates/CVTemplateProps';
import {
  Document,
  Image,
  Page,
  View,
} from '@modules/PDFView/CVTemplates/Templates/Components';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import { Skill } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';

interface Props extends DefaultProps {
  isHtml?: boolean;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Opensans',
    fontSize: 11,
    lineHeight: 1.5,
    color: 'black',
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
  whiteText: {
    color: 'white',
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop20: {
    marginTop: 20,
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
  sidebar: {
    backgroundColor: '#183042',
    width: '30%',
  },
  topBar: {
    height: 'auto',
    flexDirection: 'column',
    backgroundColor: '#183042',
    color: 'white',
  },
  profilePicture: {
    width: 'auto',
    marginBottom: 10,
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
  },
  additionalInfoBar: {
    height: 'auto',
    color: 'white',
  },
  additionalInfoBarText: {
    marginLeft: 10,
    textDecoration: 'none',
    color: 'white',
  },
  mainPage: {
    width: '70%',
  },
  companyName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  companyPosition: {
    fontWeight: 'medium',
  },
  companyDescription: {
    marginTop: 10,
  },
  customTimeline: {
    backgroundColor: '#183042',
    width: 4,
    borderRadius: 5,
    marginRight: 40,
  },
  companyLocation: {
    marginTop: 0,
  },
  companyDuration: {
    marginTop: 2.5,
    fontWeight: 'thin',
  },
  educationSchool: {
    marginBottom: 5,
    fontWeight: 'medium',
  },
  educationDegree: {
    fontWeight: 'extralight',
  },
  educationDuration: {
    fontWeight: 'light',
  },
  educationLocation: {
    fontWeight: 'extralight',
  },
  educationDescription: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#818181',
  },
  languageCard: {
    width: 'auto',
    height: 'auto',
    margin: '0 2.5px 2.5px 0',
    backgroundColor: '#DFF0FC',
    borderRadius: 3,
    color: '#3B93D5',
    padding: '5px 7px',
  },
  skill: {
    width: 'auto',
    height: 'auto',
    margin: '0 5px 5px 0',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    padding: '5px 15px',
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'normal',
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
  projectWrapper: {
    flexDirection: 'column',
  },
});

export const Template2: FC<Props> = ({
  generalInfo,
  education,
  professionalExperience,
  skills,
  languages,
  certificates,
  projects,
  translate,
  isHtml,
}) => {
  return (
    <Document>
      <Page size='A4' style={[styles.page, styles.row]}>
        <View style={[styles.sidebar, styles.column, styles.padding20]}>
          <View style={[styles.topBar]}>
            {generalInfo?.profilePicture && (
              <View style={[styles.horizontalCenter, styles.profilePicture]}>
                <Image
                  src={generalInfo.profilePicture}
                  style={[
                    {
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      objectFit: 'cover',
                    },
                  ]}
                />
              </View>
            )}
            <TextDisplay style={styles.topBarName}>
              {generalInfo?.firstName} {generalInfo?.lastName}
            </TextDisplay>
            <TextDisplay
              style={[
                {
                  fontWeight: 'light',
                  fontSize: 11,
                  paddingTop: 5,
                },
              ]}
            >
              {generalInfo?.dob && displayDate(generalInfo?.dob, 'default')}
            </TextDisplay>
            <TextDisplay style={[styles.topBarPosition]}>
              {generalInfo?.position}
            </TextDisplay>
            <TextDisplay style={[styles.topBarText]}>
              {generalInfo?.aboutMe}
            </TextDisplay>
          </View>
          {skills && skills.length > 0 && (
            <View
              style={[
                styles.row,
                styles.marginTop10,
                {
                  flexWrap: 'wrap',
                },
              ]}
            >
              {skills.map((skill: Skill, index: number) => {
                return (
                  <View key={index} style={[styles.skill]}>
                    <TextDisplay style={[styles.skillText]}>
                      {skill.name}
                    </TextDisplay>
                  </View>
                );
              })}
            </View>
          )}
          <AdditionalInformation
            onlyIcon
            generalInfo={generalInfo}
            styles={styles}
            itemWrapperStyle={[
              styles.row,
              {
                marginTop: 3.5,
                marginBottom: 3.5,
              },
            ]}
            wrapper={(wrappedInfo: JSX.Element) => {
              return (
                <View
                  style={[
                    styles.additionalInfoBar,
                    styles.column,
                    styles.marginTop10,
                    {
                      flexWrap: 'wrap',
                    },
                  ]}
                >
                  {wrappedInfo}
                </View>
              );
            }}
            wrapperStyle={{
              gap: 10,
            }}
          />
          {languages && languages.length > 0 ? (
            <View wrap={false} style={[styles.marginTop10]}>
              <TextDisplay
                style={[
                  styles.whiteText,
                  {
                    marginBottom: 10,
                    fontSize: 15,
                    fontWeight: 'semibold',
                  },
                ]}
              >
                {translate('languages')}
              </TextDisplay>
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
                    style={[styles.column, styles.languageCard]}
                  >
                    <View style={[styles.column]}>
                      <TextDisplay style={[styles.companyName]}>
                        {lang.name}
                      </TextDisplay>
                      <TextDisplay style={[styles.companyPosition]}>
                        {translate(lang.proficiency)}
                      </TextDisplay>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
        <View style={[styles.column, styles.padding20, styles.mainPage]}>
          <View style={[styles.column, styles.horizontalCenter]}>
            {professionalExperience?.map((experience, index) => (
              <View
                wrap={false}
                key={index}
                style={[
                  styles.row,
                  {
                    width: '100%',
                    marginTop: index === 0 ? 0 : 20,
                    marginBottom:
                      index === professionalExperience.length - 1 ? 0 : 10,
                  },
                ]}
              >
                <View style={[styles.column]}>
                  <TextDisplay style={[styles.companyName]}>
                    {experience.company}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyPosition]}>
                    {experience.position}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyDuration]}>
                    {experience.location},{' '}
                    {experience.startDate && displayDate(experience.startDate)}{' '}
                    -{' '}
                    {experience.currentlyEnrolled
                      ? translate('present')
                      : experience.endDate && displayDate(experience.endDate)}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyDescription]}>
                    {experience.description}
                  </TextDisplay>
                </View>
              </View>
            ))}
          </View>
          <Projects
            defaultStyles={styles}
            projects={projects}
            translate={translate}
            wrapperStyle={{
              paddingHorizontal: 0,
            }}
          />
          <Educations
            defaultStyles={styles}
            translate={translate}
            education={education}
            wrapperStyle={{
              paddingHorizontal: 0,
            }}
          />
          <Certificates
            defaultStyles={styles}
            translate={translate}
            certificateList={certificates}
            wrapperStyle={{
              paddingHorizontal: 0,
            }}
          />
        </View>
      </Page>
    </Document>
  );
};

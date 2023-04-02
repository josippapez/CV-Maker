import {
  AdditionalInformation,
  Certificates,
  Educations,
  Languages,
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
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'Opensans',
    fontSize: 11,
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
  marginTop10: {
    marginTop: 10,
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
    backgroundColor: '#183042',
    height: 'auto',
    minHeight: 150,
  },
  topBar: {
    height: 'auto',
    flexDirection: 'row',
    color: 'white',
  },
  profilePicture: {
    width: 'auto',
    marginRight: 10,
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
    maxHeight: 150,
    height: 'auto',
    backgroundColor: '#0C1829',
    color: 'white',
  },
  additionalInfoBarText: {
    marginLeft: 20,
    textDecoration: 'none',
    color: 'white',
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
    marginTop: 0,
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
    margin: '0 10px 10px 0',
    backgroundColor: '#DFF0FC',
    borderRadius: 3,
    color: '#3B93D5',
    padding: '5px 15px',
  },
  languageName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 11,
    fontWeight: 'normal',
  },
  skill: {
    width: 'auto',
    height: 'auto',
    margin: '0 10px 10px 0',
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
});

export const Template1: FC<Props> = ({
  generalInfo,
  professionalExperience,
  certificates,
  education,
  languages,
  skills,
  projects,
  translate,
  isHtml,
}) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.personalInfo}>
          <View style={[styles.topBar, styles.paddingY20, styles.paddingX40]}>
            {generalInfo && generalInfo.profilePicture && (
              <View style={[styles.profilePicture]}>
                <Image
                  src={generalInfo.profilePicture}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    objectFit: 'cover',
                  }}
                />
              </View>
            )}
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <TextDisplay style={styles.topBarName}>
                  {generalInfo?.firstName} {generalInfo?.lastName}
                </TextDisplay>
                <TextDisplay
                  style={[
                    {
                      fontWeight: 'light',
                      fontSize: 11,
                      paddingLeft: 20,
                      paddingBottom: 3,
                      alignSelf: 'flex-end',
                    },
                  ]}
                >
                  {generalInfo?.dob && displayDate(generalInfo?.dob, 'default')}
                </TextDisplay>
              </View>
              <TextDisplay style={styles.topBarPosition}>
                {generalInfo?.position}
              </TextDisplay>
              <TextDisplay style={styles.topBarText}>
                {generalInfo?.aboutMe}
              </TextDisplay>
            </View>
          </View>
          {skills && skills.length > 0 && (
            <View
              style={[
                styles.row,
                styles.paddingX40,
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
            itemWrapperStyle={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            wrapperStyle={{
              paddingHorizontal: 40,
            }}
            backgroundColor='#0C1829'
          />
        </View>
        {professionalExperience && (
          <View style={[styles.paddingX20, styles.column]}>
            <TextDisplay
              style={[
                styles.sectionTitle,
                { paddingBottom: 20, paddingHorizontal: 20 },
              ]}
            >
              {translate('professionalExperience')}
            </TextDisplay>
            <View style={[styles.horizontalCenter]}>
              {professionalExperience?.map((experience, index) => (
                <View
                  wrap={false}
                  key={index}
                  style={[
                    styles.row,
                    {
                      width: '90%',
                      marginTop: index === 0 ? 0 : 20,
                      marginBottom:
                        index === professionalExperience.length - 1 ? 0 : 10,
                    },
                  ]}
                >
                  <View style={[styles.column, styles.customTimeline]}></View>
                  <View style={[styles.column, { width: '100%' }]}>
                    <TextDisplay style={[styles.companyName]}>
                      {experience.company}
                    </TextDisplay>
                    <View style={[styles.row]}>
                      <View
                        style={[
                          {
                            width: 17,
                            height: 17,
                            position: 'relative',
                            borderRadius: '50%',
                            left: -50.5,
                            backgroundColor: '#1e86c7',
                          },
                        ]}
                      />
                      <TextDisplay
                        style={[styles.companyPosition, { left: -17 }]}
                      >
                        {experience.position}
                      </TextDisplay>
                    </View>
                    <View
                      style={[
                        styles.row,
                        {
                          width: '100%',
                          justifyContent: 'space-between',
                          paddingBottom: 2,
                          borderBottomWidth: 1,
                          borderBottomColor: '#d1d1d1',
                        },
                      ]}
                    >
                      <TextDisplay
                        style={[styles.companyDuration, styles.lightGrayText]}
                      >
                        {experience.startDate &&
                          displayDate(experience.startDate)}{' '}
                        -{' '}
                        {experience.currentlyEnrolled
                          ? translate('present')
                          : experience.endDate &&
                            displayDate(experience.endDate)}
                      </TextDisplay>
                      <TextDisplay
                        style={[styles.companyLocation, styles.lightGrayText]}
                      >
                        {experience.location}
                      </TextDisplay>
                    </View>
                    <TextDisplay style={[styles.companyDescription]}>
                      {experience.description}
                    </TextDisplay>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        <Projects
          projects={projects}
          translate={translate}
          defaultStyles={styles}
        />
        <View
          wrap={false}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Educations
            defaultStyles={styles}
            translate={translate}
            education={education}
          />
        </View>
        <View
          wrap={false}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Certificates
            defaultStyles={styles}
            translate={translate}
            certificateList={certificates}
          />
        </View>
        <Languages
          languages={languages}
          defaultStyles={styles}
          translate={translate}
        />
      </Page>
    </Document>
  );
};

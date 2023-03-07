import {
  AdditionalInformation,
  displayDate,
} from '@modules/PDFView/CVTemplates';
import UnboundedBold from '@public/Styles/Assets/Fonts/Unbound/Unbounded-Bold.woff';
import UnboundedExtraBold from '@public/Styles/Assets/Fonts/Unbound/Unbounded-ExtraBold.woff';
import UnboundedExtraLight from '@public/Styles/Assets/Fonts/Unbound/Unbounded-ExtraLight.woff';
import UnboundedLight from '@public/Styles/Assets/Fonts/Unbound/Unbounded-Light.woff';
import UnboundedMedium from '@public/Styles/Assets/Fonts/Unbound/Unbounded-Medium.woff';
import UnboundedRegular from '@public/Styles/Assets/Fonts/Unbound/Unbounded-Regular.woff';
import UnboundedSemiBold from '@public/Styles/Assets/Fonts/Unbound/Unbounded-SemiBold.woff';
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Skill } from '../../models';
import { TextDisplay } from '../TemplateComponents/TextDisplay';
import { DefaultProps } from './CVTemplateProps';

Font.register({
  family: 'Unbounded',
  fonts: [
    {
      src: UnboundedRegular,
      fontWeight: 'normal',
    },
    {
      src: UnboundedBold,
      fontWeight: 'bold',
    },
    { src: UnboundedLight, fontWeight: 'light' },
    { src: UnboundedExtraLight, fontWeight: 'extralight' },
    { src: UnboundedSemiBold, fontWeight: 'semibold' },
    { src: UnboundedMedium, fontWeight: 'medium' },
    { src: UnboundedExtraBold, fontWeight: 'extrabold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#13171a',
    fontFamily: 'Unbounded',
    fontWeight: 'light',
    fontSize: 10,
    color: 'white',
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
  companyName: {
    fontSize: 12,
    fontWeight: 'medium',
  },
  companyPosition: {},
  companyDescription: {
    marginTop: 10,
  },
  companyLocation: {
    fontSize: 11,
    marginTop: 0,
    fontWeight: 'extralight',
  },
  companyDuration: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: 'light',
  },
  educationSchool: {
    fontSize: 11,
    marginBottom: 5,
    fontWeight: 'medium',
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'extralight',
  },
  educationDuration: {
    fontSize: 11,
    fontWeight: 'light',
  },
  educationLocation: {
    fontSize: 11,
    fontWeight: 'extralight',
  },
  educationDescription: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  certificateName: {
    fontSize: 11,
    fontWeight: 'medium',
  },
  certificateInstitution: {
    fontSize: 11,
    fontWeight: 'light',
  },
  certificateDuration: {
    fontSize: 11,
    fontWeight: 'extralight',
  },
  certificateDescription: {
    marginTop: 10,
  },
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
  skill: {
    width: 'auto',
    height: 'auto',
    margin: '0 10px 10px 0',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    padding: '5px 15px',
    borderColor: '#333333',
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'normal',
    color: 'white',
  },
});

export const CVTemplate4 = (props: DefaultProps): JSX.Element => {
  const {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    translate,
  } = props;

  return (
    <Document>
      <Page size='A4' style={[styles.page]}>
        <View
          style={[
            styles.personalInfo,
            styles.paddingX40,
            { paddingTop: 40, paddingBottom: 20 },
          ]}
        >
          <View style={[styles.topBar]}>
            {generalInfo && generalInfo.profilePicture && (
              <View style={[styles.profilePicture]}>
                <Image
                  src={generalInfo.profilePicture}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 15,
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
            itemWrapperStyle={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          />
        </View>
        {professionalExperience && professionalExperience.length > 0 && (
          <View
            style={[
              styles.paddingY10,
              styles.paddingX40,
              styles.column,
              styles.horizontalCenter,
              {
                flexGrow: 1,
                flexShrink: 1,
                backgroundColor: '#ededed',
                color: 'black',
              },
            ]}
          >
            {professionalExperience?.map((experience, index) => (
              <View
                wrap={false}
                key={index}
                style={[
                  styles.row,
                  styles.paddingY10,
                  {
                    borderTop: index === 0 ? 'none' : '1px solid #d8d8d8',
                  },
                ]}
              >
                <View style={[styles.column, { width: '50%' }]}>
                  <TextDisplay style={[styles.companyName]}>
                    {experience.company}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyDuration]}>
                    {experience.startDate && displayDate(experience.startDate)}{' '}
                    -{' '}
                    {experience.currentlyEnrolled
                      ? translate('present')
                      : experience.endDate && displayDate(experience.endDate)}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyLocation]}>
                    {experience.location}
                  </TextDisplay>
                </View>

                <View
                  style={[styles.column, styles.paddingX20, { width: '50%' }]}
                >
                  <TextDisplay style={[styles.companyPosition]}>
                    {experience.position}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyDescription]}>
                    {experience.description}
                  </TextDisplay>
                </View>
              </View>
            ))}
          </View>
        )}
        <View wrap={false} style={[styles.row, { flexGrow: 1 }]}>
          {education && education.length > 0 && (
            <View
              style={[
                styles.paddingY20,
                certificates && certificates.length > 0
                  ? { paddingLeft: 40, paddingRight: 20, width: '50%' }
                  : styles.paddingX40,
                styles.column,
                {
                  backgroundColor: '#fcfcfc',
                  color: 'black',
                  overflow: 'hidden',
                  position: 'relative',
                },
              ]}
            >
              <TextDisplay style={[styles.sectionTitle]}>
                {translate('education')}
              </TextDisplay>
              {education.map((edu, index) => (
                <View
                  key={index}
                  style={[
                    styles.column,
                    {
                      marginTop: 20,
                    },
                  ]}
                >
                  <View style={[styles.column]}>
                    <TextDisplay style={[styles.educationSchool]}>
                      {edu.course ? edu.course : edu.school}
                    </TextDisplay>
                    <TextDisplay style={[styles.educationDuration]}>
                      {edu.startDate && displayDate(edu.startDate)} -{' '}
                      {edu.currentlyEnrolled
                        ? translate('present')
                        : edu.endDate && displayDate(edu.endDate)}
                    </TextDisplay>
                    <TextDisplay style={[styles.educationDegree]}>
                      {`${edu.degree} ${
                        edu.fieldOfStudy && `, ${edu.fieldOfStudy}`
                      }`}
                    </TextDisplay>
                    {edu.url && edu.url !== '' && (
                      <Link
                        src={edu.url}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <Text
                          style={[styles.educationDegree, { color: 'black' }]}
                        >
                          {edu.url
                            .replace(/(^\w+:|^)\/\//, '')
                            .replace(/(^www\.)/, '')}
                        </Text>
                      </Link>
                    )}
                    <TextDisplay style={[styles.educationLocation]}>
                      {edu.location}
                    </TextDisplay>
                    <TextDisplay style={[styles.educationDescription]}>
                      {edu.description}
                    </TextDisplay>
                  </View>
                </View>
              ))}
            </View>
          )}
          {certificates && certificates.length > 0 && (
            <View
              style={[
                styles.paddingY20,
                education && education.length > 0
                  ? {
                      paddingLeft: 20,
                      paddingRight: 40,
                      width: '50%',
                      left: -0.5,
                    }
                  : styles.paddingX40,
                styles.column,
                {
                  backgroundColor: '#e7e4e4',
                  color: 'black',
                },
              ]}
            >
              {certificates.map((cert, index) => (
                <>
                  <View
                    key={index}
                    style={[
                      {
                        marginTop: index === 0 ? 0 : 20,
                      },
                    ]}
                  >
                    {index === 0 && (
                      <TextDisplay
                        style={[styles.sectionTitle, styles.marginBottom20]}
                      >
                        {translate('certificates')}
                      </TextDisplay>
                    )}
                    <View style={[styles.column]}>
                      <TextDisplay style={[styles.certificateName]}>
                        {cert.name}
                      </TextDisplay>
                      <TextDisplay style={[styles.certificateInstitution]}>
                        {cert.institution}
                      </TextDisplay>
                      <View
                        style={[
                          styles.row,
                          {
                            paddingBottom: 2,
                          },
                        ]}
                      >
                        <TextDisplay style={[styles.certificateDuration]}>
                          {cert.date}
                        </TextDisplay>
                      </View>
                      <TextDisplay style={[styles.certificateDescription]}>
                        {cert.description}
                      </TextDisplay>
                    </View>
                  </View>
                </>
              ))}
            </View>
          )}
        </View>
        {languages && languages.length > 0 && (
          <View
            wrap={false}
            style={[
              styles.paddingY20,
              styles.paddingX40,
              {
                backgroundColor: '#ededed',
                flex: 5,
                color: 'black',
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
                <View key={index} style={[styles.column, styles.languageCard]}>
                  <TextDisplay style={[styles.languageName]}>
                    {lang.name}
                  </TextDisplay>
                  <TextDisplay style={[styles.languageLevel]}>
                    {translate(lang.proficiency)}
                  </TextDisplay>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

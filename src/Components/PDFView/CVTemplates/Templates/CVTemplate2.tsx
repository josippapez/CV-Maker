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
import { DateTime } from 'luxon';
import OpensansBold from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Bold.ttf';
import OpensansExtraBold from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-ExtraBold.ttf';
import OpensansItalic from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Italic.ttf';
import OpensansLite from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Light.ttf';
import OpensansMedium from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Medium.ttf';
import OpensansRegular from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Regular.ttf';
import OpensansSemibold from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-SemiBold.ttf';
import { Skill } from '../../models';
import AdditionalInformation from '../TemplateComponents/AdditionalInformation';
import { TextDisplay } from '../TemplateComponents/TextDisplay';
import { DefaultProps } from './CVTemplateProps';

Font.register({
  family: 'Opensans',
  fonts: [
    {
      src: OpensansRegular,
      fontWeight: 'normal',
    },
    {
      src: OpensansBold,
      fontWeight: 'bold',
    },
    { src: OpensansLite, fontWeight: 'light' },
    { src: OpensansSemibold, fontWeight: 'semibold' },
    { src: OpensansMedium, fontWeight: 'medium' },
    { src: OpensansExtraBold, fontWeight: 'extrabold' },
    { src: OpensansItalic, fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Opensans',
    fontSize: 11,
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
  paddingX20: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  paddingY20: {
    paddingTop: 20,
    paddingBottom: 20,
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
});

const CVTemplate2 = (props: DefaultProps): JSX.Element => {
  const {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    translate,
    locale,
  } = props;

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
              {generalInfo?.dob &&
                DateTime.fromISO(generalInfo?.dob)
                  .setLocale(locale)
                  .toLocaleString()}
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
            generalInfo={generalInfo}
            styles={styles}
            itemWrapperStyle={[
              styles.row,
              {
                marginTop: 3.5,
                marginBottom: 3.5,
              },
            ]}
            wrapper={(wrappedInfo: JSX.Element[]) => {
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
                    {experience.startDate &&
                      DateTime.fromISO(experience.startDate)
                        .setLocale(locale)
                        .toLocaleString({
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                    -{' '}
                    {experience.currentlyEnrolled
                      ? translate('present')
                      : experience.endDate &&
                        DateTime.fromISO(experience.endDate)
                          .setLocale(locale)
                          .toLocaleString({ month: 'short', year: 'numeric' })}
                  </TextDisplay>
                  <TextDisplay style={[styles.companyDescription]}>
                    {experience.description}
                  </TextDisplay>
                </View>
              </View>
            ))}
          </View>
          {education && education?.length > 0 ? (
            <View style={[styles.column, styles.marginTop20]}>
              <TextDisplay style={[styles.sectionTitle, styles.lightGrayText]}>
                {translate('education')}
              </TextDisplay>
              {education?.map((edu, index) => (
                <View
                  wrap={false}
                  key={index}
                  style={[
                    styles.column,
                    {
                      width: '100%',
                      marginTop: 10,
                    },
                  ]}
                >
                  <View style={[styles.column, { width: '100%' }]}>
                    <TextDisplay style={[styles.educationSchool]}>
                      {edu.course ? edu.course : edu.school}
                    </TextDisplay>
                    <TextDisplay style={[styles.educationDuration]}>
                      {edu.startDate &&
                        DateTime.fromISO(edu.startDate)
                          .setLocale(locale)
                          .toLocaleString({
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                      -{' '}
                      {edu.currentlyEnrolled
                        ? translate('present')
                        : edu.endDate &&
                          DateTime.fromISO(edu.endDate)
                            .setLocale(locale)
                            .toLocaleString({
                              month: 'short',
                              year: 'numeric',
                            })}
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
          ) : null}
          {certificates && certificates.length > 0 ? (
            <View style={[styles.column, styles.marginTop20]}>
              {certificates.map((cert, index) => (
                <View
                  wrap={false}
                  key={index}
                  style={[
                    {
                      marginTop: index === 0 ? 0 : 10,
                    },
                  ]}
                >
                  {index === 0 && (
                    <TextDisplay
                      style={[
                        styles.sectionTitle,
                        styles.lightGrayText,
                        { marginBottom: 10, marginTop: 0 },
                      ]}
                    >
                      {translate('certificates')}
                    </TextDisplay>
                  )}
                  <View style={[styles.column, { width: '100%' }]}>
                    <TextDisplay style={[styles.companyName]}>
                      {cert.name}
                    </TextDisplay>
                    <TextDisplay style={[styles.companyPosition]}>
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
                      <TextDisplay style={[styles.companyDuration]}>
                        {cert.date}
                      </TextDisplay>
                    </View>
                    <TextDisplay style={[styles.companyDescription]}>
                      {cert.description}
                    </TextDisplay>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export default CVTemplate2;

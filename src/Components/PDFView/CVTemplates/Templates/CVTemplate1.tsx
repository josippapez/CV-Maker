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
import { TFunction } from 'react-i18next';
import OpensansBold from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Bold.ttf';
import OpensansExtraBold from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-ExtraBold.ttf';
import OpensansItalic from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Italic.ttf';
import OpensansLite from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Light.ttf';
import OpensansMedium from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Medium.ttf';
import OpensansRegular from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-Regular.ttf';
import OpensansSemibold from '../../../../Styles/Assets/Fonts/OpenSans/OpenSans-SemiBold.ttf';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Skill,
} from '../../models';
import AdditionalInformation from '../TemplateComponents/AdditionalInformation';
import { TextDisplay } from '../TemplateComponents/TextDisplay';

type Props = {
  generalInfo?: GeneralInfo;
  professionalExperience?: ProfessionalExperience[];
  certificates?: Certificate[];
  education?: Education[];
  languages?: LanguageSkill[];
  skills: Skill[];
  translate: TFunction;
};

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
    flexDirection: 'column',
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
  marginTop10: {
    marginTop: 10,
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
});

const CVTemplate1 = (props: Props): JSX.Element => {
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
        <View style={styles.personalInfo}>
          <View style={[styles.topBar, styles.padding20]}>
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
                  {generalInfo?.dob}
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
                styles.paddingX20,
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
                width: '50%',
                marginTop: 2.5,
                marginBottom: 2.5,
              },
            ]}
            wrapper={(wrappedInfo: JSX.Element[]) => {
              return (
                <View
                  style={[
                    styles.additionalInfoBar,
                    styles.paddingX20,
                    styles.paddingY10,
                    styles.row,
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
        </View>
        <View
          style={[styles.padding20, styles.column, styles.horizontalCenter]}
        >
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
                  <TextDisplay style={[styles.companyPosition, { left: -17 }]}>
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
                    {experience.startDate} - {experience.endDate}
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
        {education && education?.length > 0 ? (
          <View
            style={[
              styles.paddingX20,
              styles.column,
              styles.horizontalCenter,
              { marginBottom: 10 },
            ]}
          >
            {education?.map((edu, index) => (
              <View
                wrap={false}
                key={index}
                style={[
                  styles.column,
                  {
                    width: '90%',
                    marginTop: index === 0 ? 0 : 20,
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
                    {translate('education')}
                  </TextDisplay>
                )}
                <View style={[styles.column, { width: '100%' }]}>
                  <TextDisplay style={[styles.educationSchool]}>
                    {edu.course ? edu.course : edu.school}
                  </TextDisplay>
                  <TextDisplay style={[styles.educationDuration]}>
                    {edu.startDate} - {edu.endDate}
                  </TextDisplay>
                  <TextDisplay style={[styles.educationDegree]}>
                    {`${edu.degree} ${
                      edu.fieldOfStudy && `, ${edu.fieldOfStudy}`
                    }`}
                  </TextDisplay>
                  {edu?.url !== '' && (
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
          <View
            style={[
              styles.paddingX20,
              styles.column,
              styles.horizontalCenter,
              { marginBottom: 10 },
            ]}
          >
            {certificates.map((cert, index) => (
              <View
                wrap={false}
                key={index}
                style={[
                  {
                    width: '90%',
                    marginTop: index === 0 ? 0 : 20,
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
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingBottom: 2,
                      },
                    ]}
                  >
                    <TextDisplay
                      style={[styles.companyDuration, styles.lightGrayText]}
                    >
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
        {languages && languages.length > 0 ? (
          <View wrap={false} style={[styles.paddingX20, styles.marginTop10]}>
            <View style={{ alignItems: 'center' }}>
              <TextDisplay
                style={[
                  styles.sectionTitle,
                  styles.lightGrayText,
                  {
                    marginBottom: 10,
                    width: '90%',
                  },
                ]}
              >
                {translate('languages')}
              </TextDisplay>
            </View>
            <View
              style={[
                styles.row,
                styles.paddingX20,
                {
                  flexWrap: 'wrap',
                },
              ]}
            >
              {languages.map((lang, index) => (
                <View key={index} style={[styles.column, styles.languageCard]}>
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
      </Page>
    </Document>
  );
};

export default CVTemplate1;

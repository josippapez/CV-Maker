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
  Defs,
  Document,
  Font,
  Image,
  LinearGradient,
  Link,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import { Fragment } from 'react';
import { Skill } from '../../models';
import { BlobBottomLeft } from '../Images/BlobBottomLeft';
import { BlobTopLeft } from '../Images/BlobTopLeft';
import { BlobTopRight } from '../Images/BlobTopRight';
import { LayeredWaves } from '../Images/LayeredWaves';
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
    maxHeight: 150,
    height: 'auto',
    color: 'white',
  },
  additionalInfoBarText: {
    marginLeft: 20,
    color: 'white',
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
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
    borderColor: 'white',
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
    borderColor: 'white',
    padding: '5px 15px',
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'normal',
  },
});

export const CVTemplate3 = (props: DefaultProps): JSX.Element => {
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
            styles.marginBottom20,
          ]}
        >
          {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore */}
          <Svg
            viewBox='0 0 595 200'
            width={595}
            height={200}
            style={{
              position: 'absolute',
            }}
          >
            <Defs>
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore */}
              <LinearGradient id='myLinearGradient' x1={1} x2={0} y1={0} y2={1}>
                <Stop offset={0.5} stopOpacity={1} stopColor='#242424' />
                <Stop offset={0.7} stopOpacity={1} stopColor='#13171a' />
                <Stop offset={1} stopOpacity={1} stopColor='#13171a' />
              </LinearGradient>
            </Defs>

            <Rect
              x={0}
              y={0}
              width='100%'
              height='100%'
              fill="url('#myLinearGradient')"
            />
          </Svg>
          <View style={[styles.topBar, { paddingTop: 40, paddingBottom: 10 }]}>
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
                  <View
                    key={index}
                    style={[
                      styles.skill,
                      {
                        backgroundColor: '#242424',
                        borderColor: '#242424',
                      },
                    ]}
                  >
                    <TextDisplay
                      style={[
                        styles.skillText,
                        {
                          color: 'white',
                        },
                      ]}
                    >
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
              styles.marginBottom20,
              styles.paddingX40,
              styles.column,
              styles.horizontalCenter,
              { flexShrink: 1 },
            ]}
          >
            {professionalExperience?.map((experience, index) => (
              <View
                wrap={false}
                key={`experience-${index}`}
                style={[
                  styles.row,
                  {
                    marginTop: index === 0 ? 0 : 20,
                    marginBottom:
                      index === professionalExperience.length - 1 ? 0 : 10,
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

                <View style={[styles.column, { width: '50%' }]}>
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
        {education && education?.length > 0 ? (
          <View
            style={[
              styles.paddingY20,
              styles.paddingX40,
              styles.column,
              {
                backgroundColor: '#13171a',
                overflow: 'hidden',
                flexGrow: 1,
              },
            ]}
          >
            <TextDisplay style={[styles.sectionTitle]}>
              {translate('education')}
            </TextDisplay>
            {education?.map((edu, index) => (
              <Fragment key={`edu-${index}`}>
                {index === 0 && (
                  <View
                    key={`edu-${index}-blobTopRight`}
                    wrap={false}
                    style={{
                      position: 'absolute',
                      width: 595,
                      height: 100,
                      zIndex: -1,
                      top: 0,
                    }}
                  >
                    <BlobTopRight />
                  </View>
                )}
                {index === education.length - 1 &&
                  (certificates && certificates.length > 0 ? (
                    <View
                      key={`edu-${index}-blobBottomLeft`}
                      wrap={false}
                      style={{
                        position: 'absolute',
                        width: 595,
                        height: 100,
                        zIndex: -1,
                        bottom: 0,
                      }}
                    >
                      <BlobBottomLeft />
                    </View>
                  ) : (
                    <View
                      key={`edu-${index}-LayeredWaves`}
                      wrap={false}
                      style={{
                        position: 'absolute',
                        width: 595,
                        height: 100,
                        zIndex: -1,
                        bottom: 0,
                      }}
                    >
                      <LayeredWaves />
                    </View>
                  ))}
                <View
                  wrap={false}
                  key={`edu-${index}`}
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
                          style={[styles.educationDegree, { color: 'white' }]}
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
              </Fragment>
            ))}
          </View>
        ) : null}
        {certificates && certificates.length > 0 ? (
          <View
            wrap={false}
            style={[
              styles.paddingY20,
              styles.paddingX40,
              styles.column,
              { backgroundColor: '#13171a', overflow: 'hidden', flexGrow: 5 },
            ]}
          >
            <View
              wrap={false}
              style={{
                position: 'absolute',
                width: 595,
                height: 100,
                zIndex: -1,
                bottom: 0,
              }}
            >
              <LayeredWaves />
            </View>
            {certificates.map((cert, index) => (
              <Fragment key={`cert-${index}`}>
                {index === 0 && (
                  <View
                    key={`cert-${index}-blobTopLeft`}
                    wrap={false}
                    style={{
                      position: 'absolute',
                      width: 595,
                      height: 100,
                      zIndex: -1,
                      top: 0,
                    }}
                  >
                    <BlobTopLeft />
                  </View>
                )}
                <View
                  wrap={false}
                  key={`cert-${index}`}
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
              </Fragment>
            ))}
          </View>
        ) : null}
        {languages && languages.length > 0 ? (
          <View
            wrap={false}
            style={[
              styles.paddingY20,
              styles.paddingX40,
              {
                backgroundColor: '#3b3b3b',
                flexGrow: 1,
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
                  key={`lang-${index}`}
                  style={[styles.column, styles.languageCard]}
                >
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
        ) : null}
      </Page>
    </Document>
  );
};

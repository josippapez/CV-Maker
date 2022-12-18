import {
  Defs,
  Document,
  Font,
  Image,
  LinearGradient,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import { TFunction } from 'react-i18next';
import UnboundedBold from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-Bold.ttf';
import UnboundedExtraBold from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-ExtraBold.ttf';
import UnboundedExtraLight from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-ExtraLight.ttf';
import UnboundedLight from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-Light.ttf';
import UnboundedMedium from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-Medium.ttf';
import UnboundedRegular from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-Regular.ttf';
import UnboundedSemiBold from '../../../../Styles/Assets/Fonts/Unbound/Unbounded-SemiBold.ttf';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from '../../models';
import { BlobBottomLeft } from '../Images/BlobBottomLeft';
import { BlobTopLeft } from '../Images/BlobTopLeft';
import { BlobTopRight } from '../Images/BlobTopRight';
import { LayeredWaves } from '../Images/LayeredWaves';
import AdditionalInformation from '../TemplateComponents/AdditionalInformation';

type Props = {
  generalInfo?: GeneralInfo;
  professionalExperience?: ProfessionalExperience[];
  certificates?: Certificate[];
  education?: Education[];
  languages?: LanguageSkill[];
  translate: TFunction;
};

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
    textDecoration: 'none',
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
});

const CVTemplate3 = (props: Props): JSX.Element => {
  const {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
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
                <Text style={styles.topBarName}>
                  {generalInfo?.firstName} {generalInfo?.lastName}
                </Text>
                <Text
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
                </Text>
              </View>
              <Text style={styles.topBarPosition}>{generalInfo?.position}</Text>
              <Text style={styles.topBarText}>{generalInfo?.aboutMe}</Text>
            </View>
          </View>
          <AdditionalInformation
            generalInfo={generalInfo}
            styles={styles}
            itemWrapperStyle={[
              styles.row,
              {
                width: '50%',
                paddingTop: 10,
                paddingRight: 20,
              },
            ]}
            wrapper={(wrappedInfo: JSX.Element[]) => {
              return (
                <View
                  style={[
                    styles.additionalInfoBar,
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
                key={index}
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
                  <Text style={[styles.companyName]}>{experience.company}</Text>
                  <Text style={[styles.companyDuration]}>
                    {experience.startDate} - {experience.endDate}
                  </Text>
                  <Text style={[styles.companyLocation]}>
                    {experience.location}
                  </Text>
                </View>

                <View style={[styles.column, { width: '50%' }]}>
                  <Text style={[styles.companyPosition]}>
                    {experience.position}
                  </Text>
                  <Text style={[styles.companyDescription]}>
                    {experience.description}
                  </Text>
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
            {education?.map((edu, index) => (
              <>
                {index === 0 && (
                  <View
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
                  key={index}
                  style={[
                    styles.column,
                    {
                      marginTop: index === 0 ? 0 : 20,
                    },
                  ]}
                >
                  {index === 0 && (
                    <Text
                      style={[
                        styles.sectionTitle,
                        { marginBottom: 10, marginTop: 0 },
                      ]}
                    >
                      {translate('education')}
                    </Text>
                  )}
                  <View style={[styles.column]}>
                    <Text style={[styles.educationSchool]}>{edu.school}</Text>
                    <Text style={[styles.educationDuration]}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    <Text style={[styles.educationDegree]}>
                      {edu.degree}, {edu.fieldOfStudy}
                    </Text>
                    <Text style={[styles.educationLocation]}>
                      {edu.location}
                    </Text>
                    <Text style={[styles.educationDescription]}>
                      {edu.description}
                    </Text>
                  </View>
                </View>
              </>
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
              <>
                {index === 0 && (
                  <View
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
                  key={index}
                  style={[
                    {
                      marginTop: index === 0 ? 0 : 20,
                    },
                  ]}
                >
                  {index === 0 && (
                    <Text style={[styles.sectionTitle, styles.marginBottom20]}>
                      {translate('certificates')}
                    </Text>
                  )}
                  <View style={[styles.column]}>
                    <Text style={[styles.certificateName]}>{cert.name}</Text>
                    <Text style={[styles.certificateInstitution]}>
                      {cert.institution}
                    </Text>
                    <View
                      style={[
                        styles.row,
                        {
                          paddingBottom: 2,
                        },
                      ]}
                    >
                      <Text style={[styles.certificateDuration]}>
                        {cert.date}
                      </Text>
                    </View>
                    <Text style={[styles.certificateDescription]}>
                      {cert.description}
                    </Text>
                  </View>
                </View>
              </>
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
                backgroundColor: '#535353',
                flexGrow: 1,
              },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    marginBottom: 10,
                  },
                ]}
              >
                {translate('languages')}
              </Text>
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
                  <Text style={[styles.languageName]}>{lang.name}</Text>
                  <Text style={[styles.languageLevel]}>
                    {translate(lang.proficiency)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export default CVTemplate3;

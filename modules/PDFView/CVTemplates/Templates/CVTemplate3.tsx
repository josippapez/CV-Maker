import {
  AdditionalInformation,
  CertificatesWithImage,
  EducationWithImage,
  Languages,
  ProfessionalExperienceDisplay,
  Projects,
} from '@modules/PDFView/CVTemplates/TemplateComponents';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import {
  Defs,
  Document,
  Image,
  LinearGradient,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  View,
} from '@react-pdf/renderer';
import { Skill } from '../../models';
import { TextDisplay } from '../TemplateComponents/TextDisplay';
import { DefaultProps } from './CVTemplateProps';

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
    color: '#a3a3a3',
    paddingBottom: 10,
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
    projects,
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
        <ProfessionalExperienceDisplay
          styles={styles}
          translate={translate}
          professionalExperience={professionalExperience}
          color='white'
        />
        <Projects
          defaultStyles={styles}
          translate={translate}
          projects={projects}
        />
        <EducationWithImage
          styles={styles}
          translate={translate}
          education={education}
          certificates={certificates}
        />
        <CertificatesWithImage
          styles={styles}
          translate={translate}
          certificates={certificates}
        />
        <Languages
          defaultStyles={styles}
          translate={translate}
          languages={languages}
          backgroundColor='#3b3b3b'
          flexGrow={1}
          color='white'
        />
      </Page>
    </Document>
  );
};

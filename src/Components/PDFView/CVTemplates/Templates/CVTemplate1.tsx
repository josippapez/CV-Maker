import {
  Document,
  Font,
  Image,
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
} from '../../PDFViewContainer';
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
    height: 'auto',
    minHeight: 150,
  },
  topBar: {
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: '#183042',
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
    fontSize: 11,
  },
  additionalInfoBar: {
    maxHeight: 150,
    height: 'auto',
    backgroundColor: '#0C1829',
    color: 'white',
  },
  additionalInfoBarText: {
    fontSize: 11,
    marginLeft: 20,
    textDecoration: 'none',
    color: 'white',
  },
  companyName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  companyPosition: {
    fontSize: 11,
    fontWeight: 'medium',
  },
  companyDescription: {
    fontSize: 11,
    marginTop: 10,
  },
  customTimeline: {
    backgroundColor: '#183042',
    width: 4,
    borderRadius: 5,
    marginRight: 40,
  },
  companyLocation: {
    fontSize: 11,
    marginTop: 0,
  },
  companyDuration: {
    fontSize: 11,
    marginTop: 0,
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
});

const CVTemplate1 = (props: Props): JSX.Element => {
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
              <Text style={styles.topBarName}>
                {generalInfo?.firstName} {generalInfo?.lastName}
              </Text>
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
                <Text style={[styles.companyName]}>{experience.company}</Text>
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
                  <Text style={[styles.companyPosition, { left: -17 }]}>
                    {experience.position}
                  </Text>
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
                  <Text style={[styles.companyDuration, styles.lightGrayText]}>
                    {experience.startDate} - {experience.endDate}
                  </Text>
                  <Text style={[styles.companyLocation, styles.lightGrayText]}>
                    {experience.location}
                  </Text>
                </View>
                <Text style={[styles.companyDescription]}>
                  {experience.description}
                </Text>
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
                  <Text
                    style={[
                      styles.sectionTitle,
                      styles.lightGrayText,
                      { marginBottom: 10, marginTop: 0 },
                    ]}
                  >
                    {translate('education')}
                  </Text>
                )}
                <View style={[styles.column, { width: '100%' }]}>
                  <Text style={[styles.companyName]}>{edu.school}</Text>
                  <Text style={[styles.companyPosition]}>
                    {edu.degree}, {edu.fieldOfStudy}
                  </Text>
                  <Text style={[styles.companyLocation]}>{edu.location}</Text>
                  <Text
                    style={[
                      styles.companyDuration,
                      styles.lightGrayText,
                      {
                        marginTop: 10,
                        fontStyle: 'italic',
                      },
                    ]}
                  >
                    {edu.startDate} - {edu.endDate}
                  </Text>
                  <Text style={[styles.companyDescription]}>
                    {edu.description}
                  </Text>
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
                  <Text
                    style={[
                      styles.sectionTitle,
                      styles.lightGrayText,
                      { marginBottom: 10, marginTop: 0 },
                    ]}
                  >
                    {translate('certificates')}
                  </Text>
                )}
                <View style={[styles.column, { width: '100%' }]}>
                  <Text style={[styles.companyName]}>{cert.name}</Text>
                  <Text style={[styles.companyPosition]}>
                    {cert.institution}
                  </Text>
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
                    <Text
                      style={[styles.companyDuration, styles.lightGrayText]}
                    >
                      {cert.date}
                    </Text>
                  </View>
                  <Text style={[styles.companyDescription]}>
                    {cert.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
        {languages && languages.length > 0 ? (
          <View wrap={false} style={[styles.paddingX20, styles.marginTop10]}>
            <View style={{ alignItems: 'center' }}>
              <Text
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
              </Text>
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
                    <Text style={[styles.companyName]}>{lang.name}</Text>
                    <Text style={[styles.companyPosition]}>
                      {translate(lang.proficiency)}
                    </Text>
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

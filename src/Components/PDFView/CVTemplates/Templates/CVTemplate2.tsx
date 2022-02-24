import {
  Document,
  Font,
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
    height: 'auto',
    color: 'white',
  },
  additionalInfoBarText: {
    fontSize: 11,
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
    marginTop: 2.5,
    fontWeight: 'thin',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 20,
  },
  languageCard: {
    fontSize: 11,
    width: 'auto',
    height: 'auto',
    margin: '0 2.5px 2.5px 0',
    backgroundColor: '#DFF0FC',
    borderRadius: 3,
    color: '#3B93D5',
    padding: '5px 7px',
  },
});

const CVTemplate2 = (props: Props): JSX.Element => {
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
      <Page size='A4' style={[styles.page, styles.row]}>
        <View style={[styles.sidebar, styles.column, styles.padding20]}>
          <View style={[styles.topBar]}>
            <Text style={styles.topBarName}>
              {generalInfo?.firstName} {generalInfo?.lastName}
            </Text>
            <Text style={[styles.topBarPosition]}>{generalInfo?.position}</Text>
            <Text style={[styles.topBarText]}>{generalInfo?.aboutMe}</Text>
          </View>
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
              <Text
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
              </Text>
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
                  <Text style={[styles.companyName]}>{experience.company}</Text>
                  <Text style={[styles.companyPosition]}>
                    {experience.position}
                  </Text>
                  <Text style={[styles.companyDuration]}>
                    {experience.location}, {experience.startDate} -{' '}
                    {experience.endDate}
                  </Text>
                  <Text style={[styles.companyDescription]}>
                    {experience.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          {education && education?.length > 0 ? (
            <View style={[styles.column, styles.marginTop20]}>
              {education?.map((edu, index) => (
                <View
                  wrap={false}
                  key={index}
                  style={[
                    styles.column,
                    {
                      width: '100%',
                      marginTop: index === 0 ? 0 : 10,
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
                          paddingBottom: 2,
                        },
                      ]}
                    >
                      <Text style={[styles.companyDuration]}>{cert.date}</Text>
                    </View>
                    <Text style={[styles.companyDescription]}>
                      {cert.description}
                    </Text>
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

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useMemo } from 'react';
import { Input, ProfessionalExperience } from '../PDFViewContainer';
import Earth from './Images/Earth';
import Email from './Images/Email';
import Phone from './Images/Phone';
import Pin from './Images/Pin';
import OpensansRegular from '../../../Styles/Assets/Fonts/OpenSans/OpenSans-Regular.ttf';
import OpensansBold from '../../../Styles/Assets/Fonts/OpenSans/OpenSans-Bold.ttf';
import OpensansLite from '../../../Styles/Assets/Fonts/OpenSans/OpenSans-Light.ttf';
import OpensansSemibold from '../../../Styles/Assets/Fonts/OpenSans/OpenSans-SemiBold.ttf';
import OpensansMedium from '../../../Styles/Assets/Fonts/OpenSans/OpenSans-Medium.ttf';
import OpensansExtraBold from '../../../Styles/Assets/Fonts/OpenSans/OpenSans-ExtraBold.ttf';

type Props = {
  generalInfo?: Input;
  professionalExperience?: ProfessionalExperience[];
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
  personalInfo: {
    height: 265,
  },
  topBar: {
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
    backgroundColor: '#0C1829',
    color: 'white',
  },
  additionalInfoBarText: {
    fontSize: 11,
    marginLeft: 20,
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
});

const CVTemplate1 = (props: Props): JSX.Element => {
  const { generalInfo, professionalExperience } = props;
  console.log(professionalExperience);

  return useMemo(
    () => (
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.personalInfo}>
            <View style={[styles.topBar, styles.padding20]}>
              <Text style={styles.topBarName}>
                {generalInfo?.firstName} {generalInfo?.lastName}
              </Text>
              <Text style={styles.topBarPosition}>{generalInfo?.position}</Text>
              <Text style={styles.topBarText}>{generalInfo?.aboutMe}</Text>
            </View>
            <View
              style={[styles.additionalInfoBar, styles.padding20, styles.row]}
            >
              <View style={[styles.column, { width: '50%' }]}>
                {generalInfo?.email ? (
                  <View style={styles.row}>
                    <Email width={14} />
                    <Text style={styles.additionalInfoBarText}>
                      {generalInfo?.email}
                    </Text>
                  </View>
                ) : null}
                {generalInfo?.city || generalInfo?.country ? (
                  <View style={[styles.row, styles.marginTop10]}>
                    <Pin width={14} />
                    <Text style={[styles.additionalInfoBarText]}>
                      {generalInfo?.city}, {generalInfo?.country}
                    </Text>
                  </View>
                ) : null}
                {generalInfo?.phone ? (
                  <View style={[styles.row, styles.marginTop10]}>
                    <Phone width={14} />
                    <Text style={styles.additionalInfoBarText}>
                      {generalInfo?.phone}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={[styles.column, { width: '50%' }]}>
                {generalInfo?.website ? (
                  <View style={[styles.row]}>
                    <Earth width={14} />
                    <Text style={[styles.additionalInfoBarText]}>
                      {generalInfo?.website}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
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
                    width: '85%',
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
                    <Text
                      style={[styles.companyDuration, styles.lightGrayText]}
                    >
                      {experience.startDate} - {experience.endDate}
                    </Text>
                    <Text
                      style={[styles.companyLocation, styles.lightGrayText]}
                    >
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
          <View>
            <Text>Certificates</Text>
          </View>
          <View>
            <Text>Education</Text>
          </View>
        </Page>
      </Document>
    ),
    [generalInfo, professionalExperience]
  );
};

export default CVTemplate1;

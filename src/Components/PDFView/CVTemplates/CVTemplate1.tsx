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

type Props = {
  firstInput?: Input;
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
  },
  companyDescription: {
    fontSize: 11,
    marginTop: 10,
  },
  companyLocation: {
    fontSize: 11,
    marginTop: 10,
  },
  companyDuration: {
    fontSize: 11,
    marginTop: 10,
  },
});

const CVTemplate1 = (props: Props): JSX.Element => {
  const { firstInput, professionalExperience } = props;
  console.log(professionalExperience);

  return useMemo(
    () => (
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.personalInfo}>
            <View style={[styles.topBar, styles.padding20]}>
              <Text style={styles.topBarName}>
                {firstInput?.firstName} {firstInput?.lastName}
              </Text>
              <Text style={styles.topBarPosition}>{firstInput?.position}</Text>
              <Text style={styles.topBarText}>{firstInput?.aboutMe}</Text>
            </View>
            <View
              style={[styles.additionalInfoBar, styles.padding20, styles.row]}
            >
              <View style={[styles.column, { width: '50%' }]}>
                {firstInput?.email ? (
                  <View style={styles.row}>
                    <Email width={14} />
                    <Text style={styles.additionalInfoBarText}>
                      {firstInput?.email}
                    </Text>
                  </View>
                ) : null}
                {firstInput?.city || firstInput?.country ? (
                  <View style={[styles.row, styles.marginTop10]}>
                    <Pin width={14} />
                    <Text style={[styles.additionalInfoBarText]}>
                      {firstInput?.city}, {firstInput?.country}
                    </Text>
                  </View>
                ) : null}
                {firstInput?.phone ? (
                  <View style={[styles.row, styles.marginTop10]}>
                    <Phone width={14} />
                    <Text style={styles.additionalInfoBarText}>
                      {firstInput?.phone}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={[styles.column, { width: '50%' }]}>
                {firstInput?.website ? (
                  <View style={[styles.row]}>
                    <Earth width={14} />
                    <Text style={[styles.additionalInfoBarText]}>
                      {firstInput?.website}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <View style={[styles.padding20, styles.column]}>
            {professionalExperience?.map((experience, index) => (
              <View
                wrap={false}
                key={index}
                style={[
                  styles.row,
                  {
                    marginLeft: '10%',
                    width: '100%',
                    marginTop: index === 0 ? 0 : 20,
                    marginBottom:
                      index === professionalExperience.length - 1 ? 0 : 10,
                  },
                ]}
              >
                <View
                  style={[
                    styles.column,
                    {
                      backgroundColor: '#183042',
                      width: 4,
                      borderRadius: 5,
                      marginRight: 40,
                    },
                  ]}
                ></View>
                <View style={[styles.column]}>
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
                  <Text style={[styles.companyLocation]}>
                    {experience.location}
                  </Text>
                  <Text style={[styles.companyDuration]}>
                    {experience.startDate} - {experience.endDate}
                  </Text>
                  <Text style={[styles.companyDescription]}>
                    {experience.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    ),
    [firstInput, professionalExperience]
  );
};

export default CVTemplate1;

import { AdditionalInformation } from '@modules/PDFView/CVTemplates/TemplateComponents/AdditionalInformation';
import { Skills } from '@modules/PDFView/CVTemplates/TemplateComponents/Skills';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import { GeneralInfo, Skill } from '@modules/PDFView/models';
import { Image, StyleSheet, View } from '@react-pdf/renderer';
import { FC } from 'react';

type Props = {
  styles: ReturnType<typeof StyleSheet.create>;
  generalInfo?: GeneralInfo;
  skills?: Skill[];
};

export const PersonalInfo: FC<Props> = ({ styles, generalInfo, skills }) => {
  return (
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
      <Skills styles={styles} skills={skills} />
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
  );
};

import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { View } from '@modules/PDFView/CVTemplates/Templates/Components';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import { Certificate } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';

type Props = {
  cert: Certificate;
  styles: ReturnType<typeof StyleSheet.create>;
};

const certificateStyles = StyleSheet.create({
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
});

export const CertificateItem: FC<Props> = ({ cert, styles }) => {
  return (
    <View style={[styles.column, styles.paddingY10]}>
      <TextDisplay style={[certificateStyles.certificateName]}>
        {cert.name}
      </TextDisplay>
      <TextDisplay style={[certificateStyles.certificateInstitution]}>
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
        <TextDisplay style={[certificateStyles.certificateDuration]}>
          {cert.date && displayDate(cert.date)}
        </TextDisplay>
      </View>
      <TextDisplay style={[certificateStyles.certificateDescription]}>
        {cert.description}
      </TextDisplay>
    </View>
  );
};

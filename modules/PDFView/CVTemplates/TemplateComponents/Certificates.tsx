import { CertificateItem } from '@modules/PDFView/CVTemplates/TemplateComponents/CertificateItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { Certificate } from '@modules/PDFView/models';
import { StyleSheet, View } from '@react-pdf/renderer';
import { TFunction } from 'next-i18next';
import { FC } from 'react';

type Props = {
  certificateList?: Certificate[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: TFunction;
};

export const Certificates: FC<Props> = ({
  certificateList,
  defaultStyles: styles,
  translate,
}) => {
  if (!certificateList || certificateList.length === 0) return null;

  return (
    <View style={[styles.paddingY20, styles.paddingX20, styles.column]}>
      <TextDisplay style={[styles.sectionTitle]}>
        {translate('certificates')}
      </TextDisplay>
      {certificateList.map((cert, index) => (
        <CertificateItem cert={cert} styles={styles} key={index} />
      ))}
    </View>
  );
};

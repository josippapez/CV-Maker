import { CertificateItem } from '@modules/PDFView/CVTemplates/TemplateComponents/CertificateItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { View } from '@modules/PDFView/CVTemplates/Templates/Components';
import { Certificate } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = {
  certificateList?: Certificate[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: ReturnType<typeof useTranslations<string>>;
  wrapperStyle?: Style;
};

export const Certificates: FC<Props> = ({
  certificateList,
  defaultStyles: styles,
  translate,
  wrapperStyle = {},
}) => {
  if (!certificateList || certificateList.length === 0) return null;

  return (
    <View
      wrap={false}
      style={[
        styles.paddingY20,
        styles.paddingX20,
        styles.column,
        wrapperStyle,
      ]}
    >
      <TextDisplay style={[styles.sectionTitle]}>
        {translate('certificates')}
      </TextDisplay>
      {certificateList.map((cert, index) => (
        <CertificateItem cert={cert} styles={styles} key={index} />
      ))}
    </View>
  );
};

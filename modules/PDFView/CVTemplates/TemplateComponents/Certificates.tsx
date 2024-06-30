import { CertificateItem } from '@modules/PDFView/CVTemplates/TemplateComponents/CertificateItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { Certificate } from '@modules/PDFView/models';
import { View } from '@rawwee/react-pdf-html';
import { StyleSheet } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { useTranslations } from 'next-intl';

type Props = {
  certificateList?: Certificate[];
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  translate: ReturnType<typeof useTranslations<string>>;
  wrapperStyle?: Style;
};

export const Certificates = ({
  certificateList,
  defaultStyles: styles,
  translate,
  wrapperStyle = {},
}: Props) => {
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
      {certificateList?.map((cert, index) => (
        <CertificateItem cert={cert} styles={styles} key={index} />
      ))}
    </View>
  );
};

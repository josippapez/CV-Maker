import { BlobTopLeft } from '@modules/PDFView/CVTemplates/Images/BlobTopLeft';
import { LayeredWaves } from '@modules/PDFView/CVTemplates/Images/LayeredWaves';
import { CertificateItem } from '@modules/PDFView/CVTemplates/TemplateComponents/CertificateItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { Certificate } from '@modules/PDFView/models';
import { StyleSheet, View } from '@react-pdf/renderer';
import { TFunction } from 'next-i18next';
import { FC } from 'react';

type Props = {
  certificates?: Certificate[];
  styles: ReturnType<typeof StyleSheet.create>;
  translate: TFunction;
};

export const CertificatesWithImage: FC<Props> = ({
  certificates,
  styles,
  translate,
}) => {
  if (!certificates || certificates.length === 0) return null;

  return (
    <View
      wrap={false}
      style={[
        styles.paddingY20,
        styles.paddingX40,
        styles.column,
        { backgroundColor: '#13171a', overflow: 'hidden', flexGrow: 5 },
      ]}
    >
      <TextDisplay style={[styles.sectionTitle]}>
        {translate('certificates')}
      </TextDisplay>
      <View
        key={`cert-blobTopLeft`}
        wrap={false}
        style={{
          position: 'absolute',
          width: 595,
          height: 100,
          zIndex: -1,
          top: 0,
        }}
      >
        <BlobTopLeft />
      </View>
      {certificates.map((cert, index) => (
        <CertificateItem
          key={`cert-${index}`}
          styles={styles}
          cert={cert}
        />
      ))}
      <View
        wrap={false}
        style={{
          position: 'absolute',
          width: 595,
          height: 100,
          zIndex: -1,
          bottom: 0,
        }}
      >
        <LayeredWaves />
      </View>
    </View>
  );
};

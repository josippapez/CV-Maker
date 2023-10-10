import { BlobBottomLeft } from '@modules/PDFView/CVTemplates/Images/BlobBottomLeft';
import { BlobTopRight } from '@modules/PDFView/CVTemplates/Images/BlobTopRight';
import { LayeredWaves } from '@modules/PDFView/CVTemplates/Images/LayeredWaves';
import { EducationItem } from '@modules/PDFView/CVTemplates/TemplateComponents/EducationItem';
import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { View } from '@rawwee/react-pdf-html';
import { Certificate, Education } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';

type Props = {
  styles: ReturnType<typeof StyleSheet.create>;
  education?: Education[];
  certificates?: Certificate[];
  translate: ReturnType<typeof useTranslations<string>>;
};

export const EducationWithImage: FC<Props> = ({
  styles,
  education,
  certificates,
  translate,
}) => {
  if (!education || education.length === 0) return null;

  return (
    <View
      wrap={false}
      style={[
        styles.paddingY20,
        styles.paddingX40,
        styles.column,
        {
          backgroundColor: '#13171a',
          overflow: 'hidden',
          flexGrow: 1,
        },
      ]}
    >
      <TextDisplay style={[styles.sectionTitle]}>
        {translate('education')}
      </TextDisplay>
      {education.map((edu, index) => (
        <Fragment key={`edu-${index}`}>
          {index === 0 && (
            <View
              key={`edu-${index}-blobTopRight`}
              wrap={false}
              style={{
                position: 'absolute',
                zIndex: -1,
                top: 0,
                right: 0,
              }}
            >
              <BlobTopRight />
            </View>
          )}
          {index === education.length - 1 &&
            (certificates && certificates.length > 0 ? (
              <View
                key={`edu-${index}-blobBottomLeft`}
                wrap={false}
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  bottom: 0,
                }}
              >
                <BlobBottomLeft />
              </View>
            ) : (
              <View
                key={`edu-${index}-LayeredWaves`}
                wrap={false}
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  bottom: 0,
                }}
              >
                <LayeredWaves />
              </View>
            ))}
          <EducationItem edu={edu} styles={styles} translate={translate} />
        </Fragment>
      ))}
    </View>
  );
};

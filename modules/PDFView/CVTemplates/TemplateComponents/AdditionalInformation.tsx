import {
  Earth,
  Email,
  Facebook,
  GitHub,
  Linkedin,
  Phone,
  Pin,
  Twitter,
} from '@modules/PDFView';
import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { GeneralInfo } from '../../models';

type Props = {
  generalInfo?: GeneralInfo;
  styles: ReturnType<typeof StyleSheet.create>;
  wrapper(children: JSX.Element[]): JSX.Element;
  itemWrapperStyle?: Style[] | Style;
};

export const AdditionalInformation = (props: Props) => {
  const { generalInfo, styles, wrapper, itemWrapperStyle } = props;

  const info: JSX.Element[] = [
    {
      icon: Email,
      text: generalInfo?.email,
      condition: generalInfo?.email,
    },
    {
      icon: Pin,
      text: `${generalInfo?.city}, ${generalInfo?.country}`,
      condition: generalInfo?.city || generalInfo?.country,
    },
    {
      icon: Phone,
      text: generalInfo?.phone,
      condition: generalInfo?.phone,
    },
    {
      icon: Linkedin,
      link: generalInfo?.LinkedIn,
      condition: generalInfo?.LinkedIn,
    },
    {
      icon: GitHub,
      link: generalInfo?.GitHub,
      condition: generalInfo?.GitHub,
    },
    {
      icon: Facebook,
      link: generalInfo?.Facebook,
      condition: generalInfo?.Facebook,
    },
    {
      icon: Twitter,
      link: generalInfo?.Twitter,
      condition: generalInfo?.Twitter,
    },
    {
      icon: Earth,
      link: generalInfo?.website,
      condition: generalInfo?.website,
    },
  ]
    .filter(({ condition }) => {
      return condition;
    })
    .map(({ icon, text, link }, index) => {
      return (
        <View key={`additionalInfo-${index}`} style={itemWrapperStyle}>
          {icon({ width: 14 })}
          {text && <Text style={styles.additionalInfoBarText}>{text}</Text>}
          {link && (
            <Link
              src={link}
              style={{
                textDecoration: 'none',
              }}
            >
              <Text style={styles.additionalInfoBarText}>
                {link.replace(/(^\w+:|^)\/\//, '').replace(/(^www\.)/, '')}
              </Text>
            </Link>
          )}
        </View>
      );
    });

  return wrapper(info);
};

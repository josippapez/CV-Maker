import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { GeneralInfo } from '../../models';
import Earth from '../Images/Earth';
import Email from '../Images/Email';
import Facebook from '../Images/Facebook';
import GitHub from '../Images/Github';
import Linkedin from '../Images/Linkedin';
import Phone from '../Images/Phone';
import Pin from '../Images/Pin';
import Twitter from '../Images/Twitter';

type Props = {
  generalInfo?: GeneralInfo;
  styles: ReturnType<typeof StyleSheet.create>;
  wrapper(children: JSX.Element[]): JSX.Element;
  itemWrapperStyle?: Style[] | Style;
};

const AdditionalInformation = (props: Props) => {
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
        <View key={index} style={itemWrapperStyle}>
          {icon({ width: 14 })}
          {text && <Text style={styles.additionalInfoBarText}>{text}</Text>}
          {link && (
            <Text style={styles.additionalInfoBarText} src={link}>
              {link.replace(/(^\w+:|^)\/\//, '').replace(/(^www\.)/, '')}
            </Text>
          )}
        </View>
      );
    });

  return wrapper(info);
};

export default AdditionalInformation;

import { Earth } from '@modules/PDFView/CVTemplates/Images/Earth';
import { Email } from '@modules/PDFView/CVTemplates/Images/Email';
import { Facebook } from '@modules/PDFView/CVTemplates/Images/Facebook';
import { GitHub } from '@modules/PDFView/CVTemplates/Images/Github';
import { Linkedin } from '@modules/PDFView/CVTemplates/Images/Linkedin';
import { Phone } from '@modules/PDFView/CVTemplates/Images/Phone';
import { Pin } from '@modules/PDFView/CVTemplates/Images/Pin';
import { Twitter } from '@modules/PDFView/CVTemplates/Images/Twitter';
import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { FC } from 'react';
import { GeneralInfo } from '../../models';

type Props = {
  generalInfo?: GeneralInfo;
  onlyIcon?: boolean;
  styles: ReturnType<typeof StyleSheet.create>;
  itemWrapperStyle?: Style[] | Style;
  wrapperStyle?: Style;
  backgroundColor?: string;
  wrapper?: (children: JSX.Element) => JSX.Element;
};

const additionalInfoStyles = StyleSheet.create({
  infoDisplay: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'flex-end',
  },
  iconsDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1.5px solid #919191',
    borderRadius: '50%',
    padding: 6,
    width: 29,
  },
});

export const AdditionalInformation: FC<Props> = ({
  generalInfo,
  styles,
  itemWrapperStyle,
  onlyIcon,
  wrapperStyle = {},
  backgroundColor,
  wrapper,
}) => {
  const info: JSX.Element[] = [
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
  ]
    .filter(({ condition }) => {
      return condition;
    })
    .map(({ icon, text }, index) => {
      return (
        <View key={`additionalInfo-${index}-1`} style={itemWrapperStyle}>
          {icon({ width: 14 })}
          {text && <Text style={styles.additionalInfoBarText}>{text}</Text>}
        </View>
      );
    });

  const links: JSX.Element[] = [
    {
      icon: Email,
      text: generalInfo?.email,
      condition: generalInfo?.email,
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
      const LinkDisplay = () => (
        <Link
          src={link || `mailto:${text}`}
          style={[additionalInfoStyles.iconsDisplay]}
        >
          {icon({ width: 14 })}
        </Link>
      );

      return onlyIcon ? (
        <LinkDisplay key={`additionalInfo-${index}-2`} />
      ) : (
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

  return wrapper ? (
    wrapper(
      <View key={'wrapped-info'} style={wrapperStyle}>
        <View style={additionalInfoStyles.infoWrapper}>{info}</View>
        <View style={additionalInfoStyles.iconWrapper}>{links}</View>
      </View>
    )
  ) : (
    <View
      style={{
        backgroundColor,
      }}
    >
      <View style={[additionalInfoStyles.infoDisplay, wrapperStyle]}>
        <View style={additionalInfoStyles.infoWrapper}>{info}</View>
        <View style={additionalInfoStyles.iconWrapper}>{links}</View>
      </View>
    </View>
  );
};

import { Font } from '@react-pdf/renderer';
import { DateTime, DateTimeFormatOptions } from 'luxon';

export const displayDate = (
  date: string,
  format: DateTimeFormatOptions | 'default' = {
    month: 'short',
    year: 'numeric',
  }
) => {
  if (date.length === 4) return date;
  return DateTime.fromISO(date).toLocaleString(
    format === 'default' ? undefined : format
  );
};

export const registerFonts = (template: string) => {
  const Unbounded = [
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-Regular.woff',
      fontWeight: 400,
    },
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-Bold.woff',
      fontWeight: 700,
    },
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-Light.woff',
      fontWeight: 300,
    },
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-ExtraLight.woff',
      fontWeight: 200,
    },
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-SemiBold.woff',
      fontWeight: 600,
    },
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-Medium.woff',
      fontWeight: 500,
    },
    {
      src: '/Styles/Assets/Fonts/Unbound/Unbounded-ExtraBold.woff',
      fontWeight: 800,
    },
  ];

  const Switzer = [
    {
      src: '/Styles/Assets/Fonts/Switzer/Switzer-Extralight.woff',
      fontWeight: 200,
    },
    {
      src: '/Styles/Assets/Fonts/Switzer/Switzer-Regular.woff',
      fontWeight: 400,
    },
    {
      src: '/Styles/Assets/Fonts/Switzer/Switzer-Medium.woff',
      fontWeight: 500,
    },
    {
      src: '/Styles/Assets/Fonts/Switzer/Switzer-SemiBold.woff',
      fontWeight: 600,
    },
    {
      src: '/Styles/Assets/Fonts/Switzer/Switzer-Bold.woff',
      fontWeight: 700,
    },
  ];

  const OpenSans = [
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Regular.ttf',
      fontWeight: 400,
    },
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Bold.ttf',
      fontWeight: 700,
    },
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Light.ttf',
      fontWeight: 300,
    },
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-SemiBold.ttf',
      fontWeight: 600,
    },
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Medium.ttf',
      fontWeight: 500,
    },
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-ExtraBold.ttf',
      fontWeight: 800,
    },
    {
      src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Italic.ttf',
      fontStyle: 'italic',
    },
  ];

  if (template.includes('Premium')) {
    Font.register({
      family: 'Unbounded',
      fonts: Unbounded,
    });
    Font.register({
      family: 'Switzer',
      fonts: Switzer,
    });

    Unbounded.forEach(font => {
      document.fonts.add(
        new FontFace('Unbounded', `url(${font.src})`, {
          weight: font.fontWeight.toString(),
        })
      );
    });
    Switzer.forEach(font => {
      document.fonts.add(
        new FontFace('Switzer', `url(${font.src})`, {
          weight: font.fontWeight.toString(),
        })
      );
    });
  }

  if (template.includes('CVTemplate')) {
    Font.register({
      family: 'Opensans',
      fonts: OpenSans,
    });

    OpenSans.forEach(font => {
      document.fonts.add(
        new FontFace('OpenSans', `url(${font.src})`, {
          weight: font.fontWeight?.toString(),
          style: font.fontStyle,
        })
      );
    });
  }
};

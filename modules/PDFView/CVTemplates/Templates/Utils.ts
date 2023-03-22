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
  if (template.includes('Premium')) {
    Font.register({
      family: 'Unbounded',
      fonts: [
        {
          src: '/Styles/Assets/Fonts/Unbound/Unbounded-Regular.woff',
          fontWeight: 'normal',
        },
        {
          src: '/Styles/Assets/Fonts/Unbound/Unbounded-Bold.woff',
          fontWeight: 'bold',
        },
        {
          src: '/Styles/Assets/Fonts/Unbound/Unbounded-Light.woff',
          fontWeight: 'light',
        },
        {
          src: '/Styles/Assets/Fonts/Unbound/Unbounded-ExtraLight.woff',
          fontWeight: 'extralight',
        },
        {
          src: '/Styles/Assets/Fonts/Unbound/Unbounded-SemiBold.woff',
          fontWeight: 'semibold',
        },
        {
          src: '/Styles/Assets/Fonts/Unbound/Unbounded-Medium.woff',
          fontWeight: 'medium',
        },
        {
          src: '@public/Styles/Assets/Fonts/Unbound/Unbounded-ExtraBold.woff',
          fontWeight: 'extrabold',
        },
      ],
    });
  }

  if (template.includes('CVTemplate')) {
    Font.register({
      family: 'Opensans',
      fonts: [
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Regular.woff',
          fontWeight: 'normal',
        },
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Bold.woff',
          fontWeight: 'bold',
        },
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Light.woff',
          fontWeight: 'light',
        },
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-SemiBold.woff',
          fontWeight: 'semibold',
        },
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Medium.woff',
          fontWeight: 'medium',
        },
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-ExtraBold.woff',
          fontWeight: 'extrabold',
        },
        {
          src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Italic.woff',
          fontStyle: 'italic',
        },
      ],
    });
  }
  if (template.includes('Premium')) {
    const Unbounded = [
      {
        src: '/Styles/Assets/Fonts/Unbound/Unbounded-Regular.woff',
        fontWeight: 'normal',
      },
      {
        src: '/Styles/Assets/Fonts/Unbound/Unbounded-Bold.woff',
        fontWeight: 'bold',
      },
      {
        src: '/Styles/Assets/Fonts/Unbound/Unbounded-Light.woff',
        fontWeight: 'light',
      },
      {
        src: '/Styles/Assets/Fonts/Unbound/Unbounded-ExtraLight.woff',
        fontWeight: 'extralight',
      },
      {
        src: '/Styles/Assets/Fonts/Unbound/Unbounded-SemiBold.woff',
        fontWeight: 'semibold',
      },
      {
        src: '/Styles/Assets/Fonts/Unbound/Unbounded-Medium.woff',
        fontWeight: 'medium',
      },
      {
        src: '@public/Styles/Assets/Fonts/Unbound/Unbounded-ExtraBold.woff',
        fontWeight: 'extrabold',
      },
    ];

    Unbounded.forEach(font => {
      document.fonts.add(
        new FontFace('Unbounded', `url(${font.src})`, {
          weight: font.fontWeight,
        })
      );
    });
  }

  if (template.includes('CVTemplate')) {
    const OpenSans = [
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Regular.woff',
        fontWeight: 'normal',
      },
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Bold.woff',
        fontWeight: 'bold',
      },
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Light.woff',
        fontWeight: 'light',
      },
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-SemiBold.woff',
        fontWeight: 'semibold',
      },
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Medium.woff',
        fontWeight: 'medium',
      },
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-ExtraBold.woff',
        fontWeight: 'extrabold',
      },
      {
        src: '/Styles/Assets/Fonts/OpenSans/OpenSans-Italic.woff',
        fontStyle: 'italic',
      },
    ];

    OpenSans.forEach(font => {
      document.fonts.add(
        new FontFace('OpenSans', `url(${font.src})`, {
          weight: font.fontWeight,
          style: font.fontStyle,
        })
      );
    });
  }
};

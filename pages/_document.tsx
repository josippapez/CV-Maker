import i18nextConfig from 'next-i18next.config';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: {
  __NEXT_DATA__: {
    props: { pageProps: { locale: string } };
    page: string;
    query: { locale?: string };
  };
}) {
  const { __NEXT_DATA__ } = props;

  const currentLocale =
    __NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

  const setInitialTheme = `
  function getUserPreference() {
    if(window.localStorage.getItem('theme')) {
      return window.localStorage.getItem('theme')
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
  }
  document.body.classList.add(getUserPreference());
`;

  return (
    <Html lang={currentLocale}>
      <Head>
        <meta
          name='keywords'
          content='CV, Resume, Maker, maker, Template, CV Template, CV Maker, CV Maker Hrvatski, Životopis, Kreiranje životopisa, Posao, CV Posao, Profesionalni CV, Profesionalni životopis, CV Builder, CV Builder Hrvatski, Builder, Job, Experience, Professional, Professional Experience, Job Experience, Resume, Resume Maker, Resume Builder, Share, Share CV, Share Resume, Download, Download CV, Download Resume, Print, Print CV, Print Resume, PDF, PDF CV, PDF Resume, Google Drive, Google Drive CV, Google Drive Resume, Register, Login, Sync Resume, Sync CV, Sync, Sy'
        />
        <meta name='author' content='Josip Papež' />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
        <meta name='google' content='nositelinkssearchbox' />
        <meta name='google' content='notranslate' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PWA App' />
        <meta name='description' content='Best PWA App in the world' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />
        <meta
          name='google-site-verification'
          content='Pa7EgWXkYbyNhyNiDDHiMurSrf0fMjBaZzIWth-N0Wo'
        />

        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />

        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />
        <meta property='og:title' content='CV Maker' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://cv-maker.dev/' />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

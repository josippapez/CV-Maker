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
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

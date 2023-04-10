import { PageLoader } from '@modules/Shared/Loader';
import '@public/Styles/index.css';
import { Settings } from 'luxon';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    opera: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    Settings.defaultLocale = i18n.language;
  }, []);

  return (
    <>
      <ToastContainer />
      <PageLoader>
        <Component {...pageProps} />
      </PageLoader>
    </>
  );
}

export default appWithTranslation(MyApp);

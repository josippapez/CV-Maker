import { PageLoader } from '@modules/Shared/Loader';
import '@public/Styles/index.css';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    opera: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  // if (typeof window === 'object' && window.location.search) {
  //   const params = queryToObject(window.location.search);
  //   if (params.state === LINKEDIN_STATE && window.opener) {
  //     window.opener.postMessage(params);
  //   }
  // }

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

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

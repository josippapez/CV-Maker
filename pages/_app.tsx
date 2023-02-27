import PageLoader from '@/Components/Shared/Loader/PageLoader';
import '@public/Styles/index.css';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Suspense, useEffect, useMemo, useState } from 'react';

const DynamicNavbar = dynamic(
  () => import('@/Components/Shared/Navbar/NavbarPresenter'),
  {
    ssr: false,
  }
);

declare global {
  interface Window {
    opera: any;
  }
}

function MyApp({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  useMemo(async () => {
    await import('@/i18n');
  }, []);

  return (
    <>
      <Head>
        <meta
          name='description'
          content='CV Maker tool with templates to choose from.'
        />
        <meta
          name='keywords'
          content='CV,Resume,Maker,Template,CV Template,CV Maker,CV Maker Hrvatski,Životopis,Kreiranje životopisa,Posao,CV Posao,Profesionalni CV,Profesionalni životopis,CV Builder,CV Builder Hrvatski,Builder,Job,Experience,Professional,Professional Experience,Job Experience,Resume,Resume Maker,Resume Builder,Share,Share CV,Share Resume,Download,Download CV,Download Resume,Print,Print CV,Print Resume,PDF,PDF CV,PDF Resume,Google Drive,Google Drive CV,Google Drive Resume,Register,Login,Sync Resume,Sync CV,Sync,Sy'
        />
        <meta name='author' content='Josip Papež' />
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />
        <meta name='google' content='nositelinkssearchbox' />
        <meta name='google' content='notranslate' />
        <meta property='og:title' content='CV Maker' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://cv-maker.jp.app/' />
        <link rel='apple-touch-icon' href='./logo.png' />
        <link rel='manifest' href='./manifest.json' />
        <meta
          name='google-site-verification'
          content='Pa7EgWXkYbyNhyNiDDHiMurSrf0fMjBaZzIWth-N0Wo'
        />
      </Head>
      <div className='h-screen'>
        <PageLoader isLoading={loading}>
          <Suspense fallback={null}>
            <DynamicNavbar />
          </Suspense>
          <Component {...pageProps} />
        </PageLoader>
      </div>
    </>
  );
}

export default MyApp;

import i18n from '@/translations/i18n';
import { RoutingProvider } from '@modules/Providers';
import { PageLoader } from '@modules/Shared/Loader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';

const DynamicPDFView = dynamic(
  () =>
    import('@modules/PDFPreview/CVMakerPreviewPage').then(
      mod => mod.CVMakerPreviewPage
    ),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

const DynamicNavbar = dynamic(
  () =>
    import('@modules/Navbar/NavbarPresenter').then(mod => mod.NavbarPresenter),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

const Create: NextPage = () => {
  useEffect(() => {
    i18n.init();
  }, []);

  return (
    <RoutingProvider>
      <Head>
        <title>View CV</title>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <DynamicNavbar />
      <DynamicPDFView />
    </RoutingProvider>
  );
};

export default Create;

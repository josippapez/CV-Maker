import i18n from '@/translations/i18n';
import { PageLoader } from '@modules/Shared/Loader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
  () => import('@modules/Navbar').then(mod => mod.NavbarPresenter),
  {
    ssr: false,
    loading: () => null,
  }
);

const Create: NextPage = () => {
  i18n.init();
  return (
    <>
      <Head>
        <title>View CV</title>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <DynamicNavbar />
      <DynamicPDFView />
    </>
  );
};

export default Create;

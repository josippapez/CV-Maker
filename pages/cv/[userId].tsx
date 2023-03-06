import { NavbarPresenter } from '@modules/Navbar';
import { PageLoader } from '@modules/Shared/Loader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicPDFView = dynamic(
  () => import('@modules/PDFPreview').then(mod => mod.CVMakerPreviewPage),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>View CV</title>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <NavbarPresenter />
      <DynamicPDFView />
    </>
  );
};

export default Create;

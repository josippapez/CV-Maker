import { NavbarPresenter } from '@modules/Navbar';
import { PageLoader } from '@modules/Shared';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicPDFView = dynamic(
  () => import('@modules/PDFView').then(mod => mod.CVMakerPage),
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
      </Head>
      <NavbarPresenter />
      <DynamicPDFView />
    </>
  );
};

export default Create;

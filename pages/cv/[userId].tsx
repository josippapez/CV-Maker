import PageLoader from '@/Components/Shared/Loader/PageLoader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicPDFView = dynamic(
  () => import('@/Components/PDFView/CVMakerPage'),
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
      <DynamicPDFView />
    </>
  );
};

export default Create;

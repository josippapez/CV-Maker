import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import PageLoader from '../../src/Components/Shared/Loader/PageLoader';

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
      <title>Create CV</title>
      <DynamicPDFView />
    </>
  );
};

export default Create;

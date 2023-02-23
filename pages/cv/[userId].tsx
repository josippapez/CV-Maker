import PageLoader from '@/Components/Shared/Loader/PageLoader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

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
      <title>View CV</title>
      <DynamicPDFView />
    </>
  );
};

export default Create;

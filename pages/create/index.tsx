import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import PageLoader from '../../src/Components/Shared/Loader/PageLoader';

const DynamicPDFView = dynamic(
  () => import('@/Components/PDFView/CVMakerPage'),
  {
    ssr: false,
  }
);

const Create: NextPage = () => {
  return (
    <Suspense fallback={<PageLoader isLoading />}>
      <title>Create CV</title>
      <DynamicPDFView />
    </Suspense>
  );
};

export default Create;

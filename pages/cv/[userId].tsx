import PageLoader from '@/Components/Shared/Loader/PageLoader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicPDFView = dynamic(
  () => import('@/Components/PDFView/PDFViewContainer'),
  {
    ssr: false,
  }
);

const Create: NextPage = () => {
  return (
    <Suspense fallback={<PageLoader isLoading />}>
      <title>View CV</title>
      <DynamicPDFView />
    </Suspense>
  );
};

export default Create;

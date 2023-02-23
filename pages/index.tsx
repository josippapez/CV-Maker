import PageLoader from '@/Components/Shared/Loader/PageLoader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicLandingPage = dynamic(
  () => import('../src/Components/LandingPage/LandingPage'),
  {
    ssr: false,
  }
);

const LoginPage: NextPage = () => {
  return (
    <>
      <title>CVMaker</title>
      <Suspense fallback={<PageLoader isLoading />}>
        <DynamicLandingPage />
      </Suspense>
    </>
  );
};

export default LoginPage;

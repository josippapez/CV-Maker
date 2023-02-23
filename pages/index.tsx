import PageLoader from '@/Components/Shared/Loader/PageLoader';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DynamicLandingPage = dynamic(
  () => import('../src/Components/LandingPage/LandingPage'),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

const LoginPage: NextPage = () => {
  return (
    <>
      <title>CVMaker</title>
      <DynamicLandingPage />
    </>
  );
};

export default LoginPage;

import LandingPage from '@/Components/LandingPage/LandingPage';
import { NextPage } from 'next';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>CV Maker</title>
      </Head>
      <LandingPage />
    </>
  );
};

export default LoginPage;

const getStaticProps = makeStaticProps(['LandingPage']);
export { getStaticPaths, getStaticProps };

import LandingPage from '@/Components/LandingPage/LandingPage';
import NavbarPresenter from '@/Components/Shared/Navbar/NavbarPresenter';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const getStaticProps = makeStaticProps(['LandingPage']);
export { getStaticPaths, getStaticProps };

function LoginPage({
  RoutesWithLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>CV Maker</title>
      </Head>
      <NavbarPresenter routesWithLocale={RoutesWithLocale} />
      <LandingPage routesWithLocale={RoutesWithLocale} />
    </>
  );
}

export default LoginPage;

import { LandingPage } from '@modules/LandingPage';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const getStaticProps = makeStaticProps(['LandingPage', 'Navbar']);
export { getStaticPaths, getStaticProps };

const DynamicNavbar = dynamic(
  () => import('@modules/Navbar').then(mod => mod.NavbarPresenter),
  {
    ssr: false,
    loading: () => null,
  }
);

function LoginPage({
  RoutesWithLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>CV Maker</title>
      </Head>
      <DynamicNavbar routesWithLocale={RoutesWithLocale} />
      <LandingPage routesWithLocale={RoutesWithLocale} />
    </>
  );
}

export default LoginPage;

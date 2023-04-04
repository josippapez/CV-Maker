import { LandingPage } from '@modules/LandingPage';
import { NavbarPresenter } from '@modules/Navbar';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const getStaticProps = makeStaticProps(['LandingPage', 'Navbar']);
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

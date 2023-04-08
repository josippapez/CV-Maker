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
        <meta
          name='description'
          content='CV Maker tool with templates to choose from, google data sync, and with the ability to share your CV with others.'
        />
      </Head>
      <NavbarPresenter routesWithLocale={RoutesWithLocale} />
      <LandingPage routesWithLocale={RoutesWithLocale} />
    </>
  );
}

export default LoginPage;

import { LandingPage } from '@modules/LandingPage';
import { NavbarPresenter } from '@modules/Navbar';
import { RoutingProvider } from '@modules/Providers';
import { InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const getStaticProps = makeStaticProps(['LandingPage', 'Navbar']);
export { getStaticPaths, getStaticProps };

function LoginPage({
  RoutesWithLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, i18n } = useTranslation('LandingPage');

  return (
    <RoutingProvider RoutesWithLocale={RoutesWithLocale}>
      <Head>
        <title>{t('pageName')}</title>
        <meta
          name='description'
          content='CV Maker tool with templates to choose from, google data sync, and with the ability to share your CV with others.'
        />
        <meta
          name='keywords'
          content='Resume, Resume builder, CV, CV builder, CV Maker, Build a resume, Professional resume builder, Build a CV, Professional CV Builder, Resume Templates, CV Templates, Resume builder with templates, CV builder with templates, Resume builder with google data sync, CV builder with google data sync,'
        />
        <meta property='og:url' content='https://cv-maker.dev/' />
        <link rel='canonical' href='https://cv-maker.dev/' />
        <meta name='language' content={i18n.language || 'en-US'} />
      </Head>
      <NavbarPresenter />
      <LandingPage />
    </RoutingProvider>
  );
}

export default LoginPage;

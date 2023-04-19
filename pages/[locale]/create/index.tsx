import { NavbarPresenter } from '@modules/Navbar';
import { RoutingProvider } from '@modules/Providers';
import { PageLoader } from '@modules/Shared/Loader';
import { InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const DynamicCVMakerPage = dynamic(
  () => import('@modules/PDFView/CVMakerPage').then(mod => mod.CVMakerPage),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

function Create({
  RoutesWithLocale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, i18n } = useTranslation('Navbar');

  return (
    <RoutingProvider RoutesWithLocale={RoutesWithLocale}>
      <Head>
        <title>{t('create')}</title>
        <meta
          name='description'
          content='Create your CV using beautiful templates and save your data to google cloud or just download or share your CV using sharable link'
        />
        <meta
          name='keywords'
          content='Resume, Resume builder, CV, CV builder, CV Maker, Build a resume, Professional resume builder, Build a CV, Professional CV Builder, Resume Templates, CV Templates, Resume builder with templates, CV builder with templates, Resume builder with google data sync, CV builder with google data sync,'
        />
        <meta name='language' content={i18n.language || 'en-US'} />
      </Head>
      <NavbarPresenter />
      <DynamicCVMakerPage />
    </RoutingProvider>
  );
}

export default Create;

const getStaticProps = makeStaticProps([
  'CVTemplates',
  'GeneralInput',
  'LanguagesInput',
  'ProfessionalExperienceInput',
  'EducationInput',
  'CertificatesInput',
  'SkillsInput',
  'ProjectsInput',
  'DatePicker',
  'VersionHistoryModal',
  'PDFTabNavigation',
  'Navbar',
]);
export { getStaticPaths, getStaticProps };

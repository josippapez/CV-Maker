import { NavbarPresenter } from '@modules/Navbar';
import { PageLoader } from '@modules/Shared';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';

const DynamicPDFView = dynamic(
  () => import('@modules/PDFView').then(mod => mod.CVMakerPage),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create CV</title>
      </Head>
      <NavbarPresenter />
      <DynamicPDFView />
    </>
  );
};

export default Create;

const getStaticProps = makeStaticProps([
  'CVTemplates',
  'GeneralInput',
  'LanguagesInput',
  'ProfessionalExperienceInput',
  'EducationInput',
  'CertificatesInput',
  'SkillsInput',
  'DatePicker',
  'VersionHistoryModal',
]);
export { getStaticPaths, getStaticProps };

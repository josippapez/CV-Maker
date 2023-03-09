import { NavbarPresenter } from '@modules/Navbar';
import { PageLoader } from '@modules/Shared/Loader';
import { NextPage } from 'next';
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

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create CV</title>
      </Head>
      <NavbarPresenter />
      <DynamicCVMakerPage />
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
  'ProjectsInput',
  'DatePicker',
  'VersionHistoryModal',
  'PDFTabNavigation',
]);
export { getStaticPaths, getStaticProps };

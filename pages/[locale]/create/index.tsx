import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getStaticPaths, makeStaticProps } from 'ssg-setup/getStatic';
import PageLoader from '../../../src/Components/Shared/Loader/PageLoader';

const DynamicPDFView = dynamic(
  () => import('@/Components/PDFView/CVMakerPage'),
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

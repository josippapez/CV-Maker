import { DisplayPdfModalButton } from '@modules/PDFView/DisplayPdfModalButton';
import { PDFInputsContainer } from '@modules/PDFView/PDFInputs/PDFInputsContainer';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { PageLoader } from '@modules/Shared/Loader/PageLoader';
import { usePDFComponentsAreHTML } from '@rawwee/react-pdf-html';
import dynamic from 'next/dynamic';
import { FC, useEffect } from 'react';

const DynamicPDFDisplay = dynamic(
  () =>
    import('@modules/Shared/PDFDisplay/PDFDisplay').then(mod => ({
      default: mod.PDFDisplay,
    })),
  {
    ssr: false,
    loading: () => <PageLoader isLoading />,
  }
);

export const CreateView: FC = () => {
  const { setHtml } = usePDFComponentsAreHTML();
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    template,
    projects,
  } = usePDFData();

  useEffect(() => {
    setHtml(true);
  }, []);

  const data = {
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    template,
    projects,
  };

  return (
    <div
      className={`flex w-full flex-grow flex-row overflow-hidden max-[1550px]:flex-col`}
    >
      <div className={`flex h-full max-h-full w-5/12 max-[1550px]:w-full`}>
        <PDFInputsContainer />
      </div>

      <DisplayPdfModalButton
        className='focus:shadow-outline absolute bottom-2 right-2 mt-3 hidden h-10 w-10 cursor-pointer select-none rounded-full bg-[#b8b8b8] text-sm font-bold shadow-md transition-all focus:outline-none dark:bg-[#616161] max-[1550px]:flex'
        iconStrokeColor='dark:stroke-white stroke-black'
        data={data}
      />

      {process.env.NODE_ENV === 'production' ? (
        <DynamicPDFDisplay data={data} />
      ) : (
        (!process.env.NEXT_PUBLIC_HIDE_PDF ||
          process.env.NEXT_PUBLIC_HIDE_PDF === 'false') && (
          <DynamicPDFDisplay data={data} />
        )
      )}
    </div>
  );
};

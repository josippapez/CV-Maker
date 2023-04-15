import { DisplayPdfModalButton } from '@modules/PDFView/DisplayPdfModalButton';
import { PDFInputsContainer } from '@modules/PDFView/PDFInputs/PDFInputsContainer';
import { useAuth } from '@modules/Providers';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { PageLoader } from '@modules/Shared/Loader';
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
  const windowSize = useWindowSize();
  const isMobileView = windowSize.width < 1550;
  const { user } = useAuth();
  const { getUserData } = usePDFData();

  useEffect(() => {
    getUserData();
  }, [user]);

  return (
    <div
      className={`flex w-full flex-grow overflow-hidden ${
        isMobileView ? 'flex-col' : 'flex-row'
      }`}
    >
      <div
        className={`flex h-full max-h-full ${
          isMobileView ? 'w-full' : 'w-7/12'
        }`}
      >
        <PDFInputsContainer />
      </div>
      {isMobileView && (
        <DisplayPdfModalButton
          className='focus:shadow-outline absolute bottom-2 right-2
          mt-3 h-10 w-10 cursor-pointer
          select-none rounded-full bg-[#b8b8b8] text-sm font-bold shadow-md
          transition-all focus:outline-none dark:bg-[#616161]'
          iconStrokeColor='dark:stroke-white stroke-black'
        />
      )}
      {!isMobileView &&
        (process.env.NODE_ENV === 'production' ? (
          <DynamicPDFDisplay />
        ) : (
          (!process.env.NEXT_PUBLIC_HIDE_PDF ||
            process.env.NEXT_PUBLIC_HIDE_PDF === 'false') && (
            <DynamicPDFDisplay />
          )
        ))}
    </div>
  );
};

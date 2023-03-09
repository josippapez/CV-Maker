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
      className={`flex max-h-full min-h-full w-full ${
        isMobileView ? 'flex-col' : 'flex-row'
      }`}
    >
      <div className={`${isMobileView ? 'w-full' : 'w-7/12'}`}>
        <PDFInputsContainer />
      </div>
      <DynamicPDFDisplay />
    </div>
  );
};

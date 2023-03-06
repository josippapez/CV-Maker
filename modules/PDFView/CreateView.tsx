import { useMobileView, usePDFData } from '@/Hooks';
import { PDFInputsContainer } from '@modules/PDFView';
import { useAuth } from '@modules/Providers';
import { PageLoader } from '@modules/Shared/Loader';
import { PDFDisplay } from '@modules/Shared/PDFDisplay';
import { FC, Suspense, useEffect } from 'react';

export const CreateView: FC = () => {
  const isMobileView = useMobileView();
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
      <div className={`${isMobileView ? 'w-full' : 'w-5/12'}`}>
        <Suspense fallback={<PageLoader isLoading />}>
          <PDFInputsContainer />
        </Suspense>
      </div>
      <PDFDisplay />
    </div>
  );
};

import { PDFInputsContainer, PDFView } from '@modules/PDFView';
import { PageLoader } from '@modules/Shared';
import { useMobileView } from '@/Hooks';
import { Suspense } from 'react';

type Props = {
  isPDFPreview: boolean;
};

export const PDFViewPresenter = (props: Props) => {
  const { isPDFPreview } = props;

  const isMobileView = useMobileView();

  return (
    <div
      className={`flex max-h-full min-h-full w-full ${
        isMobileView ? 'flex-col' : 'flex-row'
      }`}
    >
      {!isPDFPreview && (
        <div className={`${isMobileView ? 'w-full' : 'w-5/12'}`}>
          <Suspense fallback={<PageLoader isLoading />}>
            <PDFInputsContainer />
          </Suspense>
        </div>
      )}
      <PDFView isPDFPreview={isPDFPreview} />
    </div>
  );
};

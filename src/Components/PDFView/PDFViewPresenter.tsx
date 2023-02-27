import { PDFView } from '@/Components/PDFView/CVTemplates/PDFView';
import { Suspense } from 'react';
import useMobileView from '../../Hooks/useMobileView';
import PageLoader from '../Shared/Loader/PageLoader';
import PDFInputsContainer from './PDFInputs/PDFInputsContainer';

type Props = {
  isPDFPreview: boolean;
};

const PDFViewPresenter = (props: Props) => {
  const { isPDFPreview } = props;

  const isMobileView = useMobileView();

  return (
    <div
      className={`flex min-h-full max-h-full w-full ${
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

export default PDFViewPresenter;

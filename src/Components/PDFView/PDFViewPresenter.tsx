import { PDFViewer } from '@react-pdf/renderer';
import { useCallback, useMemo, useState } from 'react';
import {
  Document as DocumentPDFView,
  Page as DocumentPageView,
} from 'react-pdf/dist/umd/entry.webpack';
import PDFInputsContainer from '../Shared/PDFInputs/PDFInputsContainer';
import CVTemplate1 from './CVTemplates/CVTemplate1';
import { Input, ProfessionalExperience } from './PDFViewContainer';
import './PDFViewPresenter.css';

type Props = {
  pdfInstance: {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  };
  updateInstance: () => void;
  setGeneralInfo(generalInfo: Input): void;
  generalInfo: Input;
  setProfessionalExperience(
    professionalExperience: ProfessionalExperience[]
  ): void;
  professionalExperience: ProfessionalExperience[];
};

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const PDFViewPresenter = (props: Props) => {
  const {
    pdfInstance,
    updateInstance,
    generalInfo,
    setGeneralInfo,
    professionalExperience,
    setProfessionalExperience,
  } = props;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState<number | null>(null);

  const onDocumentLoadSuccess = useCallback(document => {
    const { numPages: nextNumPages } = document;
    setNumPages(nextNumPages);
    setPageNumber(1);
  }, []);

  const onItemClick = useCallback(
    ({ pageNumber: nextPageNumber }) => setPageNumber(nextPageNumber),
    []
  );

  return (
    <div className='flex w-full min-h-[100%_-_54px] justify-evenly'>
      <div className='w-2/4 mr-3'>
        <PDFInputsContainer
          setGeneralInfo={setGeneralInfo}
          generalInfo={generalInfo}
          updateInstance={updateInstance}
          professionalExperience={professionalExperience}
          setProfessionalExperience={setProfessionalExperience}
        />
      </div>
      <DocumentPDFView
        {...options}
        file={pdfInstance.url}
        renderMode='svg'
        className='h-fit drop-shadow-2xl relative w-2/4'
        onItemClick={onItemClick}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <DocumentPageView
          className='documentPDFView py-4'
          renderMode='svg'
          pageNumber={pageNumber || 1}
        />
        {pageNumber && numPages && (
          <div className='page-controls'>
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
              type='button'
              aria-label='Previous page'
            >
              ‹
            </button>
            <span>
              {pageNumber} of {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
              type='button'
              aria-label='Next page'
            >
              ›
            </button>
          </div>
        )}
      </DocumentPDFView>
      {/* <PDFViewer
        height={'100%'}
        width={window.innerWidth / 2}
        showToolbar={false}
      >
        <CVTemplate1
          firstInput={firstInput}
          professionalExperience={professionalExperience}
        />
      </PDFViewer> */}
    </div>
  );
};

export default PDFViewPresenter;

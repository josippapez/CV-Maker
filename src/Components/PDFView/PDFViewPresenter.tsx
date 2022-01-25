import { PDFViewer } from '@react-pdf/renderer';
import { useCallback, useMemo, useState } from 'react';
import {
  Document as DocumentPDFView,
  Page as DocumentPageView,
} from 'react-pdf/dist/umd/entry.webpack';
import CVTemplate1 from './CVTemplates/CVTemplate1';
import { Input, ProfessionalExperience } from './PDFViewContainer';
import './PDFViewPresenter.css';

interface Props {
  pdfInstance: {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  };
  updateInstance: () => void;
  setFirstInput(firstInput: Input): void;
  firstInput: Input;
  setProfessionalExperience(
    professionalExperience: ProfessionalExperience[]
  ): void;
  professionalExperience: ProfessionalExperience[];
}

const arrayOfInputs: Array<keyof Input> = [
  'firstName',
  'lastName',
  'aboutMe',
  'position',
  'email',
  'phone',
  'address',
  'city',
  'zip',
  'country',
  'website',
  'date',
  'dateOfBirth',
];

const arrayOfProfessionalExperience: Array<keyof ProfessionalExperience> = [
  'company',
  'position',
  'startDate',
  'endDate',
  'description',
];

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const PDFViewPresenter = (props: Props) => {
  const {
    pdfInstance,
    updateInstance,
    firstInput,
    setFirstInput,
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
    <div className='flex w-full px-4 mt-4 h-full justify-evenly'>
      <div className='w-2/4 mr-3'>
        {arrayOfInputs.map(
          (input: keyof Input): JSX.Element => (
            <div key={input} className='flex flex-col'>
              <label className='text-xl text-gray-700'>{input}</label>
              <input
                className='w-full px-2 py-1 border border-gray-400 rounded-lg'
                type='text'
                maxLength={input === 'aboutMe' ? 350 : undefined}
                value={firstInput[input]}
                onKeyDown={e => e.key === 'Enter' && updateInstance()}
                onChange={e =>
                  setFirstInput({ ...firstInput, [input]: e.target.value })
                }
              />
            </div>
          )
        )}
        {/* {arrayOfProfessionalExperience.map(
          (input: keyof ProfessionalExperience, index): JSX.Element => (
            <div key={input} className='flex flex-col'>
              <label className='text-xl text-gray-700'>{input}</label>
              <input
                className='w-full px-2 py-1 border border-gray-400 rounded-lg'
                type='text'
                value={professionalExperience[input]}
                onKeyDown={e => e.key === 'Enter' && updateInstance()}
                onChange={e =>
                  setProfessionalExperience({
                    ...professionalExperience,
                    [input]: e.target.value,
                  })
                }
              />
            </div>
          )
        )} */}
      </div>
      <DocumentPDFView
        {...options}
        file={pdfInstance.url}
        renderMode='svg'
        className='drop-shadow-2xl relative hover:'
        onItemClick={onItemClick}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <DocumentPageView
          className='documentPDFView py-4'
          renderMode='canvas'
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
      {/* <div>
        <PDFViewer
          height={'100%'}
          width={window.innerWidth / 2}
          showToolbar={false}
        >
          <CVTemplate1
            firstInput={firstInput}
            professionalExperience={professionalExperience}
          />
        </PDFViewer>
      </div> */}
    </div>
  );
};

export default PDFViewPresenter;

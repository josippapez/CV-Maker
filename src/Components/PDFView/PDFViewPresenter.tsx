import { useCallback, useState } from 'react';
import {
  Document as DocumentPDFView,
  Page as DocumentPageView,
} from 'react-pdf/dist/umd/entry.webpack';
import PDFInputsContainer from '../Shared/PDFInputs/PDFInputsContainer';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from './PDFViewContainer';
import './PDFViewPresenter.css';

type Props = {
  pdfInstance: {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  };
  setGeneralInfo(generalInfo: GeneralInfo): void;
  generalInfo: GeneralInfo;
  setProfessionalExperience(
    professionalExperience: ProfessionalExperience[]
  ): void;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  setCertificates(certificates: Certificate[]): void;
  setEducation(education: Education[]): void;
  languages: LanguageSkill[];
  setLanguages(languages: LanguageSkill[]): void;
};

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const PDFViewPresenter = (props: Props) => {
  const {
    pdfInstance,
    generalInfo,
    setGeneralInfo,
    professionalExperience,
    setProfessionalExperience,
    certificates,
    setCertificates,
    education,
    setEducation,
    languages,
    setLanguages,
  } = props;

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = useCallback(
    document => {
      const { numPages: nextNumPages } = document;
      if (pageNumber > nextNumPages) {
        setPageNumber(nextNumPages);
      }
      setNumPages(nextNumPages);
    },
    [pdfInstance.blob]
  );

  const onItemClick = useCallback(({ pageNumber: nextPageNumber }) => {
    setPageNumber(nextPageNumber);
  }, []);

  return (
    <div className='flex w-full min-h-[100%_-_54px] justify-evenly'>
      <div className='w-2/4 mr-3'>
        <PDFInputsContainer
          setGeneralInfo={setGeneralInfo}
          generalInfo={generalInfo}
          professionalExperience={professionalExperience}
          setProfessionalExperience={setProfessionalExperience}
          certificates={certificates}
          setCertificates={setCertificates}
          education={education}
          setEducation={setEducation}
          languages={languages}
          setLanguages={setLanguages}
        />
      </div>
      <div className='w-2/4'>
        <DocumentPDFView
          {...options}
          file={pdfInstance.url}
          renderMode='svg'
          className='drop-shadow-2xl sticky top-0'
          onItemClick={onItemClick}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <DocumentPageView
            height={window.innerHeight - 100}
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
      </div>
    </div>
  );
};

export default PDFViewPresenter;

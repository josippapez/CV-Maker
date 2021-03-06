import { Suspense, useCallback, useState } from 'react';
import {
  Document as DocumentPDFView,
  Page as DocumentPageView,
} from 'react-pdf/dist/umd/entry.webpack';
import PDFDownload from '../PDFDownload/PDFDownload';
import PageLoader from '../Shared/Loader/PageLoader';
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
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);

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
    <div className='flex w-full min-h-full justify-evenly'>
      <div className='w-5/12 mr-3'>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </div>
      <div className='w-7/12 transition-colors dark:bg-gray-700'>
        <Suspense fallback={<PageLoader />}>
          <DocumentPDFView
            {...options}
            file={pdfInstance.url}
            renderMode='svg'
            className='drop-shadow-2xl flex h-screen justify-center items-center sticky top-0'
            onItemClick={onItemClick}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <DocumentPageView
              height={window.innerHeight - 100}
              className='documentPDFView py-4'
              renderMode='svg'
              pageNumber={pageNumber || 1}
            >
              {pageNumber && numPages && (
                <div className='document-controls'>
                  <div className='page-controls-navigation'>
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                      type='button'
                      aria-label='Previous page'
                    >
                      ???
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
                      ???
                    </button>
                  </div>
                  <button
                    className='pdf-download'
                    onClick={() => setDisplayDownloadModal(true)}
                  />
                </div>
              )}
            </DocumentPageView>
          </DocumentPDFView>
        </Suspense>
      </div>
      {pdfInstance && pdfInstance.blob && pdfInstance.url && (
        <PDFDownload
          pdfInstance={{ url: pdfInstance.url, blob: pdfInstance.blob }}
          show={displayDownloadModal}
          closeModal={() => setDisplayDownloadModal(false)}
        />
      )}
    </div>
  );
};

export default PDFViewPresenter;

import { Suspense, useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import useMobileView from '../../Hooks/useMobileView';
import useWindowSize from '../../Hooks/useWindowSize';
import PDFDownload from '../PDFDownload/PDFDownload';
import PageLoader from '../Shared/Loader/PageLoader';
import PDFInputsContainer from '../Shared/PDFInputs/PDFInputsContainer';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from './models';
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

  const windowSize = useWindowSize();
  const isMobileView = useMobileView();

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      if (pageNumber > numPages) {
        setPageNumber(numPages);
      }
      setNumPages(numPages);
    },
    [pdfInstance.blob]
  );

  const onItemClick = useCallback(({ pageNumber }: { pageNumber: string }) => {
    setPageNumber(Number(pageNumber));
  }, []);

  return (
    <div
      className={`flex w-full min-h-full ${
        isMobileView ? 'flex-col' : 'flex-row'
      }`}
    >
      <div className={`${isMobileView ? 'w-full' : 'w-5/12'}`}>
        <Suspense fallback={<PageLoader isLoading />}>
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
      <div
        className={`transition-colors dark:bg-neutral-700 ${
          isMobileView ? 'w-full' : 'w-7/12'
        }`}
      >
        <Document
          {...options}
          file={pdfInstance.url}
          renderMode='canvas'
          className='drop-shadow-2xl flex h-screen justify-center items-center'
          onItemClick={onItemClick}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<PageLoader isLoading />}
        >
          {/* //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore */}
          <Page
            height={windowSize.height - 40}
            className='documentPDFView'
            renderMode='canvas'
            pageNumber={pageNumber || 1}
            renderTextLayer
            renderInteractiveForms
            renderAnnotationLayer
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
                <button
                  className='pdf-download'
                  onClick={() => setDisplayDownloadModal(true)}
                />
              </div>
            )}
          </Page>
        </Document>
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

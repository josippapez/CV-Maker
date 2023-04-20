import { CVTemplate } from '@modules/PDFView/CVTemplates/CVTemplate';
import { PDFDownload } from '@modules/PDFView/PDFDownload/PDFDownload';
import { useDebouncedFunction } from '@modules/Shared/Hooks';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { PageLoader } from '@modules/Shared/Loader';
import { usePDF } from '@react-pdf/renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const options = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
};

export const PDFPreview: FC = () => {
  const windowSize = useWindowSize();
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    template,
    projects,
  } = usePDFData();
  const [instance, updateInstance] = usePDF({
    document: CVTemplate({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      skills,
      template,
      projects,
    }),
  });

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);

  const pageExists = !!pageNumber && !!numPages;

  const [updateInstanceDebounce] = useDebouncedFunction(() => {
    updateInstance();
  }, 600);

  useEffect(() => {
    updateInstanceDebounce();
  }, [
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    projects,
    template,
  ]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      if (pageNumber > numPages) {
        setPageNumber(numPages);
      }
      setNumPages(numPages);
    },
    []
  );

  const onItemClick = useCallback(({ pageNumber }: { pageNumber: string }) => {
    setPageNumber(Number(pageNumber));
  }, []);

  return (
    <>
      <div
        className={`flex h-full w-full items-center justify-center drop-shadow-xl transition-colors dark:bg-neutral-700`}
      >
        <PageLoader isLoading={instance.loading}>
          <Document
            {...options}
            file={instance.url}
            renderMode='canvas'
            className='flex h-screen items-center justify-center drop-shadow-2xl'
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
              renderTextLayer={false}
              renderInteractiveForms={false}
              renderAnnotationLayer
            >
              {pageExists && (
                <div className='document-controls'>
                  <div className='page-controls-navigation'>
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                      type='button'
                      aria-label='Previous page'
                      className='text-almost-black'
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
                      className='text-almost-black'
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
        </PageLoader>
      </div>
      {instance && instance.blob && instance.url && (
        <PDFDownload
          pdfBlob={instance}
          show={displayDownloadModal}
          closeModal={() => setDisplayDownloadModal(false)}
        />
      )}
    </>
  );
};

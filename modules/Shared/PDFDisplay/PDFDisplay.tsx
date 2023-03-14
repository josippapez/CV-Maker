import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch } from '@/store/hooks';
import { CVTemplate } from '@modules/PDFView/CVTemplates/CVTemplate';
import { PDFDownload } from '@modules/PDFView/PDFDownload/PDFDownload';
import { useAuth } from '@modules/Providers';
import { useDebouncedFunction } from '@modules/Shared/Hooks/useDebouncedFunction';
import { useDebouncedValue } from '@modules/Shared/Hooks/useDebouncedValue';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { PageLoader } from '@modules/Shared/Loader';
import { Tooltip } from '@modules/Shared/Tooltip';
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

type Props = {
  isPDFPreview?: boolean;
};

export const PDFDisplay: FC<Props> = ({ isPDFPreview = false }) => {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();
  const { user } = useAuth();
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
  const [initial, setInitial] = useDebouncedValue(true, 2000);

  const userIsLoggedIn = !!user?.uid;
  const pageExists = !!pageNumber && !!numPages;

  const [updateInstanceAndSaveData] = useDebouncedFunction(() => {
    if (!instance.loading) updateInstance();

    if (isPDFPreview) return;

    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, 600);

  useEffect(() => {
    updateInstanceAndSaveData();
  }, [
    generalInfo,
    professionalExperience,
    certificates,
    education,
    languages,
    skills,
    projects,
  ]);

  useEffect(() => {
    if (!instance.loading) updateInstance();

    if (isPDFPreview) return;

    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, [template]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      if (pageNumber > numPages) {
        setPageNumber(numPages);
      }
      setNumPages(numPages);
    },
    [instance.blob]
  );

  const onItemClick = useCallback(({ pageNumber }: { pageNumber: string }) => {
    setPageNumber(Number(pageNumber));
  }, []);

  return (
    <>
      <div
        className={`transition-colors dark:bg-neutral-700 ${
          windowSize.width < 1550 || isPDFPreview ? 'w-full' : 'w-5/12'
        }`}
      >
        <PageLoader isLoading={instance.loading} inline={!isPDFPreview}>
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
              renderTextLayer
              renderInteractiveForms
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
                  {userIsLoggedIn && (
                    <Tooltip
                      tooltipText={'Copied link to clipboard'}
                      position='top'
                      showOnClick
                    >
                      <button
                        className='pdf-share'
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/cv/${user?.uid}`
                          );
                        }}
                      />
                    </Tooltip>
                  )}
                </div>
              )}
            </Page>
          </Document>
        </PageLoader>
      </div>
      {instance && instance.blob && instance.url && (
        <PDFDownload
          pdfInstance={{ url: instance.url, blob: instance.blob }}
          show={displayDownloadModal}
          closeModal={() => setDisplayDownloadModal(false)}
        />
      )}
    </>
  );
};

import {
  useDebouncedFunction,
  useDebouncedValue,
  useMobileView,
  usePDFData,
  useWindowSize,
} from '@/Hooks';
import { saveDataForUser } from '@/store/actions';
import { useAppDispatch } from '@/store/hooks';
import { CVTemplate, PDFDownload } from '@modules/PDFView';
import { useAuth } from '@modules/Providers';
import { PageLoader } from '@modules/Shared/Loader';
import { Tooltip } from '@modules/Shared/Tooltip';
import { usePDF } from '@react-pdf/renderer';
import { useTranslation } from 'next-i18next';
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
  const isMobileView = useMobileView();
  const { user } = useAuth();
  const { t } = useTranslation('CVTemplates');
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    template,
    loaded,
    setDataLoaded,
  } = usePDFData();

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displayDownloadModal, setDisplayDownloadModal] = useState(false);
  const [initial, setInitial] = useDebouncedValue(true, 2000);

  const userIsLoggedIn = !!user?.uid;
  const pageExists = !!pageNumber && !!numPages;

  const [instance, updateInstance] = usePDF({
    document: CVTemplate({
      generalInfo,
      professionalExperience,
      certificates,
      education,
      languages,
      skills,
      template,
      t,
    }),
  });

  useEffect(() => {
    if (!instance) return;

    setDataLoaded(!instance.loading);
  }, [instance.loading]);

  const updateInstanceAndSaveData = useDebouncedFunction(() => {
    if (loaded) updateInstance();

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
    template,
  ]);

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
          isMobileView || isPDFPreview ? 'w-full' : 'w-7/12'
        }`}
      >
        <PageLoader isLoading={!loaded} inline>
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

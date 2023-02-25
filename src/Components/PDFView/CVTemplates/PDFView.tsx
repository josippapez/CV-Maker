import PDFDownload from '@/Components/PDFDownload/PDFDownload';
import CVTemplate from '@/Components/PDFView/CVTemplates/CVTemplate';
import PageLoader from '@/Components/Shared/Loader/PageLoader';
import { Tooltip } from '@/Components/Shared/Tooltip/Tooltip';
import { useDebouncedFunction } from '@/Hooks/useDebouncedFunction';
import { useDebouncedValue } from '@/Hooks/useDebouncedValue';
import useMobileView from '@/Hooks/useMobileView';
import usePDFData from '@/Hooks/usePDFData';
import useWindowSize from '@/Hooks/useWindowSize';
import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usePDF } from '@react-pdf/renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const options = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
};

type Props = {
  isPDFPreview: boolean;
};

export const PDFView: FC<Props> = ({ isPDFPreview }) => {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();
  const isMobileView = useMobileView();
  const user = useAppSelector(state => state.user.user);
  const { t, i18n } = useTranslation('CVTemplates');
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

  const currentLanguage = i18n.language;
  const userIsLoggedIn = !!user.id;
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
      currentLanguage,
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
  }, 800);

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
    currentLanguage,
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
                            `${window.location.origin}/cv/${user.id}`
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

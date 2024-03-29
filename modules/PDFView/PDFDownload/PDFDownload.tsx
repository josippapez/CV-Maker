import { getCurrentTranslations } from '@/translations/hooks/getCurrentTranslations';
import { DEFAULT_LOCALE } from '@/translations/locales';
import { usePDFComponentsAreHTML } from '@rawwee/react-pdf-html';
import { Modal } from '@modules/Shared/Modal/Modal';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  PdfInstance?: () => JSX.Element;
  pdfBlob?: ReactPDF.UsePDFInstance;
  closeModal(): void;
  show: boolean;
};

export const PDFDownload = ({
  PdfInstance,
  show,
  closeModal,
  pdfBlob,
}: Props) => {
  const locale = useLocale();
  const { isHTML, setHtml } = usePDFComponentsAreHTML();
  const [cvName, setCvName] = useState('CV');
  const [download, setDownload] = useState(false);

  const [messages, setMessages] = useState({});

  const config = {
    messages,
    locale: locale || DEFAULT_LOCALE,
    defaultLocale: DEFAULT_LOCALE,
  };

  useEffect(() => {
    if (show) {
      setHtml(false);
      getCurrentTranslations(locale).then(messages => {
        setMessages(messages);
      });
    }
  }, [show]);

  return (
    <Modal
      show={show}
      position='center'
      closeModal={() => {
        setHtml(true);
        setDownload(false);
        setTimeout(() => {
          closeModal();
        }, 100);
      }}
    >
      <div className='relative h-fit w-fit flex-col bg-white p-5 text-almost-black'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Download CV</h1>
          <button
            className='absolute right-3 top-1 rounded-full font-bold hover:bg-slate-500 hover:text-white'
            style={{
              lineHeight: '10px',
              fontSize: '20px',
              width: '30px',
              height: '30px',
            }}
            onClick={() => {
              closeModal();
            }}
          >
            &times;
          </button>
        </div>
        <div className='mt-4 flex justify-center'>
          <span className='mr-3 w-auto self-center font-bold'>CV PDF name</span>
          <input
            className='w-auto border border-gray-400 p-2'
            type='text'
            placeholder='Enter CV name'
            value={cvName}
            onChange={e => setCvName(e.target.value)}
          />
        </div>
        <div className='mt-4 flex justify-center'>
          {pdfBlob && (
            <a
              className='w-full bg-blue-500 p-2 text-center font-bold text-white shadow-[0_0_20px_-5px] hover:shadow-blue-800 focus:shadow-blue-800'
              href={pdfBlob?.url || ''}
              download={`${cvName}.pdf`}
            >
              Download
            </a>
          )}
          {!pdfBlob &&
            PdfInstance &&
            messages &&
            (download ? (
              <PDFDownloadLink
                className='w-full bg-blue-500 p-2 text-center font-bold text-white shadow-[0_0_20px_-5px] hover:shadow-blue-800 focus:shadow-blue-800'
                document={
                  !isHTML ? (
                    <NextIntlClientProvider {...config}>
                      <PdfInstance />
                    </NextIntlClientProvider>
                  ) : (
                    <></>
                  )
                }
                fileName={`${cvName}.pdf`}
              >
                {({ blob, url, loading, error }) => {
                  if (loading) return 'Loading document...';
                  return 'Download now!';
                }}
              </PDFDownloadLink>
            ) : (
              <button
                className='w-full bg-blue-500 p-2 text-center font-bold text-white shadow-[0_0_20px_-5px] hover:shadow-blue-800 focus:shadow-blue-800'
                onClick={() => setDownload(true)}
              >
                Download
              </button>
            ))}
        </div>
      </div>
    </Modal>
  );
};

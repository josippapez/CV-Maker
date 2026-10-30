import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getCurrentTranslations } from '@/translations/hooks/getCurrentTranslations';
import { DEFAULT_LOCALE } from '@/translations/locales';
import { RenderAsPDF } from '@rawwee/react-pdf-html';
import { PDFDownloadLink, UsePDFInstance } from '@react-pdf/renderer';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  PdfInstance?: () => JSX.Element;
  pdfBlob?: UsePDFInstance;
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
      getCurrentTranslations(locale).then(messages => {
        setMessages(messages);
      });
    }

    return () => {
      setDownload(false);
    };
  }, [show]);

  return (
    <Dialog open={show} onOpenChange={closeModal}>
      <DialogContent className='w-full max-w-md p-6'>
        <DialogHeader>
          <DialogTitle>Download CV</DialogTitle>
          <DialogDescription>Choose a name for the PDF file.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2'>
          <label htmlFor='cv-name' className='text-sm font-medium'>
            CV PDF name
          </label>
          <Input
            id='cv-name'
            placeholder='Enter CV name'
            value={cvName}
            onChange={e => setCvName(e.target.value)}
          />
        </div>
        <DialogFooter>
          {pdfBlob && (
            <Button asChild className='w-full'>
              <a href={pdfBlob.url || ''} download={`${cvName}.pdf`}>
                Download
              </a>
            </Button>
          )}
          {!pdfBlob &&
            PdfInstance &&
            messages &&
            (download ? (
              <PDFDownloadLink
                className={buttonVariants({ className: 'w-full' })}
                document={
                  <RenderAsPDF>
                    <NextIntlClientProvider {...config}>
                      <PdfInstance />
                    </NextIntlClientProvider>
                  </RenderAsPDF>
                }
                fileName={`${cvName}.pdf`}
              >
                {({ loading }) =>
                  loading ? 'Loading document...' : 'Download now!'
                }
              </PDFDownloadLink>
            ) : (
              <Button className='w-full' onClick={() => setDownload(true)}>
                Download
              </Button>
            ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

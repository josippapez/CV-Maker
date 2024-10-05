import { getCurrentTranslations } from '@/translations/hooks/getCurrentTranslations';
import { DEFAULT_LOCALE } from '@/translations/locales';
import { PDFViewer } from '@react-pdf/renderer';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export const RealPDFDisplay: React.FC<{
  Template: React.FC;
}> = ({ Template }) => {
  const locale = useLocale();

  const [messages, setMessages] = useState({});
  const config = {
    messages,
    locale: locale || DEFAULT_LOCALE,
    defaultLocale: DEFAULT_LOCALE,
  };

  useEffect(() => {
    getCurrentTranslations(locale).then(messages => {
      setMessages(messages);
    });
  }, []);

  return (
    <PDFViewer className='w-full'>
      <NextIntlClientProvider {...config}>
        <Template />
      </NextIntlClientProvider>
    </PDFViewer>
  );
};

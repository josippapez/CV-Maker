import { getCurrentTranslations } from '@/translations/hooks/getCurrentTranslations';
import { DEFAULT_LOCALE } from '@/translations/locales';
import { RenderAsPDF } from '@rawwee/react-pdf-html';
import { PDFViewer } from '@react-pdf/renderer';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

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
      <RenderAsPDF>
        <NextIntlClientProvider {...config}>
          <Template />
        </NextIntlClientProvider>
      </RenderAsPDF>
    </PDFViewer>
  );
};

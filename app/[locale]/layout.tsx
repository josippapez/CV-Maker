import { getCurrentTranslations } from '@/translations/hooks/getCurrentTranslations';
import { DEFAULT_LOCALE } from '@/translations/locales';
import NavbarPresenter from '@modules/Navbar/NavbarPresenter';
import '@public/Styles/index.scss';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function LocaleLayout({
  children,
  params: { locale = DEFAULT_LOCALE },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const currentTranslations = await getCurrentTranslations(locale);
  const config = {
    messages: currentTranslations,
    locale: locale || DEFAULT_LOCALE,
    defaultLocale: DEFAULT_LOCALE,
  };

  return (
    <>
      <html lang={locale}>
        <body id='__next' className='relative'>
          <NextIntlClientProvider {...config}>
            <NavbarPresenter params={{ locale }} />
            <ToastContainer />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}

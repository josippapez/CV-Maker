import { DEFAULT_LOCALE } from '@/translations/locales';

export default async function LocaleLayout({
  children,
  params: { locale = DEFAULT_LOCALE },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return <>{children}</>;
}

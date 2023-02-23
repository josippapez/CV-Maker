import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import translations from './Translations';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18next
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    returnNull: false,
    debug: false,
    fallbackLng: 'hr',
    lng:
      typeof window !== 'undefined'
        ? window?.localStorage.getItem('language') || 'en-US'
        : 'en-US',
    interpolation: {
      escapeValue: false,
    },
    resources: translations,
    defaultNS: 'translation',
  });

export default i18next;

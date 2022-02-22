import i18next from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import translations from './Translations';

i18next
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'hr',
    interpolation: {
      escapeValue: false,
    },
    resources: translations,
    defaultNS: 'translation',
  });

export default i18next;

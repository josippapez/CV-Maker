import { DEFAULT_LOCALE, LOCALES } from '@/translations/locales';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  let translations;

  const language = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;

  try {
    translations = await import(`@public/translations/${language}.json`).then(
      module => module.default
    );
  } catch (error) {
    translations = await import(
      `@public/translations/${DEFAULT_LOCALE}.json`
    ).then(module => module.default);
  }

  return {
    messages: translations,
  };
});

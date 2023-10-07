import { DEFAULT_LOCALE } from '@/translations/locales';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  let translations;

  try {
    translations = await import(`@public/translations/${locale}.json`).then(
      (module) => module.default,
    );
  } catch (error) {
    translations = await import(`@public/translations/${DEFAULT_LOCALE}.json`).then(
      (module) => module.default,
    );
  }

  return {
    messages: translations,
  };
});

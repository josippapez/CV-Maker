import { DEFAULT_LOCALE } from '@/translations/locales';

export async function getCurrentTranslations(locale: string | undefined) {
  let translations;

  if (!locale) return;

  try {
    translations = await import(`@public/translations/${locale}.json`).then(
      module => module.default
    );
  } catch (error) {
    translations = await import(
      `@public/translations/${DEFAULT_LOCALE}.json`
    ).then(module => module.default);
  }

  return translations;
}

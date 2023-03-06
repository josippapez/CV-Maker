import FilesContext from '../../FilesContext';

const localeRegex = /.*\/i18n\/(.*)\.([A-Za-z-]+)\.json$/;
const translations: {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
} = {};

FilesContext.keys().forEach(file => {
  const match = localeRegex.exec(file);
  if (match) {
    const namespace = match[1]; // e.g. 'LandingPage'
    const lang = match[2]; // e.g. 'hr'
    if (lang) {
      translations[lang] = translations[lang] || {};
      translations[lang][namespace] = FilesContext(file);
    }
  }
});

export { translations };

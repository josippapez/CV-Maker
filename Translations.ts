import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.join(__dirname);
const I18N_DIR_NAME = 'i18n';
const FILENAME_PATTERN = /^(?<namespace>[^.]+)\.(?<locale>[^.]+)\.json$/;

type TranslationData = Record<string, Record<string, Record<string, string>>>;

function processDirectory(dirPath: string, translations: TranslationData) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (
        ![
          'node_modules',
          '.firebase',
          '.next',
          '.vscode',
          '.yarn',
          'out',
          'public',
        ].includes(file)
      ) {
        processDirectory(fullPath, translations);
      }
    } else if (file.endsWith('.json') && FILENAME_PATTERN.test(file)) {
      const match = FILENAME_PATTERN.exec(file);
      if (match) {
        const { namespace, locale } = match.groups!;
        const fileData = JSON.parse(
          fs.readFileSync(fullPath, 'utf-8')
        ) as Record<string, string>;
        if (!translations[locale]) {
          translations[locale] = {};
        }
        translations[locale][namespace] = fileData;
      }
    }
  }
}

function saveLocaleFiles(translations: TranslationData) {
  const publicDir = path.join(ROOT_DIR, 'public', 'locales');
  for (const [locale, data] of Object.entries(translations)) {
    const localeDir = path.join(publicDir, locale);
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }
    for (const [namespace, namespaceData] of Object.entries(data)) {
      const fileData = JSON.stringify(namespaceData);
      const filePath = path.join(localeDir, `${namespace}.json`);
      fs.writeFileSync(filePath, fileData, { encoding: 'utf-8' });
    }
    // const combinedData = Object.entries(data).reduce((acc, [namespace, namespaceData]) => {
    //   return { ...acc, [namespace]: namespaceData };
    // }, {});
    // const fileData = JSON.stringify(combinedData);
    // const filePath = path.join(localeDir, `common.json`);
    // fs.writeFileSync(filePath, fileData, { encoding: 'utf-8' });
  }
}

function extractTranslations() {
  const translations: TranslationData = {};
  const i18nDirs = new Set<string>();
  const i18nDirRegex = new RegExp(`(${I18N_DIR_NAME}[/\\\\][^/\\\\]+)+$`);
  const rootFiles = fs.readdirSync(ROOT_DIR);
  for (const file of rootFiles) {
    const fullPath = path.join(ROOT_DIR, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (i18nDirRegex.test(fullPath)) {
        i18nDirs.add(fullPath);
      } else if (
        ![
          'node_modules',
          '.firebase',
          '.next',
          '.vscode',
          '.yarn',
          'out',
          'public',
        ].includes(file)
      ) {
        processDirectory(fullPath, translations);
      }
    }
  }
  i18nDirs.forEach(dir => {
    processDirectory(dir, translations);
  });
  saveLocaleFiles(translations);
}

extractTranslations();

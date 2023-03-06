export default require.context(
  './',
  true,
  /^\.\/(?!.*(node_modules|out|\.next|\.firebase|\.yarn)).*\/i18n\/(.*)\.([A-Za-z-]+)\.json$/
);

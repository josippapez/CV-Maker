export default require.context(
  './',
  true,
  /.*\/i18n\/(.*)\.([A-Za-z-]+)\.json$/
);

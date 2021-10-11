export default {
  github: 'https://github.com/ifpb/dw', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/ifpb/dw/blob/master', // base URL for the docs repository
  titleSuffix: ' – DW',
  nextLinks: true,
  prevLinks: true,
  floatTOC: true,
  search: false,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: false,
  footerEditLink: false,
  logo: (
    <>
      <strong>Desenvolvimento Web</strong>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Linguagem de Script" />
      <meta name="og:title" content="Linguagem de Script" />
    </>
  ),
};

const replace = require('replace-in-file');
const options = {
  files: ['../docs/**/*.html', '../docs/_next/static/chunks/**/*.js'],
  from: [
    /src="\/?imgs/g,
    /src:"\/?imgs/g,
    /href="\/imgs/g,
    /href:"\/imgs/g,
    /href="\/codes/g,
    /href:"\/codes/g,
    /src:"\/codes/g,
  ],
  to: [
    'src="/dw/imgs',
    'src:"/dw/imgs',
    'href="/dw/imgs',
    'href:"/dw/imgs',
    'href="/dw/codes',
    'href:"/dw/codes',
    'src:"/dw/codes',
  ],
};
(async function () {
  try {
    const results = await replace(options);
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

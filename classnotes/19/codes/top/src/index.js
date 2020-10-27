const top = require('./lib');

(async () => {
  console.log(await top.raw());

  console.log(JSON.stringify(await top.formatted(), null, 2));
})();

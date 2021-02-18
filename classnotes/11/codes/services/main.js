const service = require('./lib');

(async () => {
  console.log(await service.all());
  await service.change('cron', 'start');
  console.log(await service.all());
})();

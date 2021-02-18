const crontab = require('./lib');

(async () => {
  console.log(await crontab.listTask());

  await crontab.addTask('00', '09', '*', '*', '1-3', 'echo "Hello"');

  console.log(await crontab.listTask());
})();

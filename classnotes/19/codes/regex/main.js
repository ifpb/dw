const top = require('./lib/top/');
const { ping } = require('./lib/ping/');
const crontab = require('./lib/crontab/');

(async () => {
  console.log(await top.process());

  console.log(await top.memory());

  await top.log();

  console.log(await ping('a.a.a.a'));

  console.log(await ping('8.8.8.8'));

  console.log(await ping('8.8.8.8', 2));

  const tasks = [
    ['00', '09', '*', '*', '1-3', 'echo "Hello"'],
    ['30', '08', '10', '06', '*', '/scripts/full-backup'],
    ['00', '11,16', '*', '*', '*', '/scripts/incremental-backup'],
    ['00', '09-18', '*', '*', '*', '/scripts/check-db-status'],
    ['00', '09-18', '*', '*', '1-5', '/scripts/check-db-status'],
    ['*/10', '*', '*', '*', '*', '/scripts/monitor.sh'],
    ['@yearly', '/scripts/annual-maintenance'],
    ['@monthly', '/scripts/tape-backup'],
    ['@daily', '/scripts/cleanup-logs'],
    ['@reboot', '/script/start-service-x'],
  ];

  console.log(await crontab.listTask());

  for (const task of tasks) {
    await crontab.addTask(...task);
  }

  console.log(await crontab.listTask());
})();

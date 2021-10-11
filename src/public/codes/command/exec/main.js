const { uname, ping, pingTimes } = require('./lib');

(async () => {
  console.log(await uname());

  console.log(await ping('8.8.8.8'));

  console.log(await pingTimes('8.8.8.8'));
})();

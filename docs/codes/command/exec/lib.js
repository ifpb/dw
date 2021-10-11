const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function uname() {
  const { stdout } = await exec('uname -a');

  return stdout;
}

async function ping(host) {
  const { stdout } = await exec(`ping -c1 ${host}`);

  return stdout;
}

async function pingTimes(host, count = 4) {
  const { stdout } = await exec(
    `ping -c${count} ${host} | grep icmp_seq | awk -F '[:=]'  '{print $5}'| cut -f1 -d' ' | tr '\n' ',' | sed 's/.$//' `
  );

  return stdout;
}

module.exports = { uname, ping, pingTimes };

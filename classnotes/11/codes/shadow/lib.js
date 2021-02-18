const util = require('util');
const exec = util.promisify(require('child_process').exec);
const SSH2Promise = require('ssh2-promise');

async function shadow() {
  const { stdout } = await exec('cat /etc/shadow');

  return stdout;
}

module.exports = { shadow };

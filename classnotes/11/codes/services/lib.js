const util = require('util');
const exec = util.promisify(require('child_process').exec);

const statusMap = {
  '-': 'down',
  '+': 'up',
  '?': 'undefined',
};

async function all() {
  const { stdout } = await exec('service --status-all');

  return parse(stdout);
}

async function change(service, status) {
  await exec(`service ${service} ${status}`);
}

function parse(output) {
  const services = [];

  for (const service of output.split('\n')) {
    if (service) {
      const regex = /\[ (?<status>[-+?]) \]\s+(?<name>\w+)/;

      const {
        groups: { status, name },
      } = service.match(regex);

      services.push({ name, status: statusMap[status] });
    }
  }

  return services;
}

module.exports = { all, change };

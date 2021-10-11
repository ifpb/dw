const util = require("util");

const exec = util.promisify(require("child_process").exec);

async function raw() {
  const { stdout } = await exec("top -n1 -b");

  return stdout;
}

async function formatted() {
  const output = await raw();

  const json = {
    memory: await memory(output)
  };

  return json;
}

async function memory(output) {
  const regex = /\s+(?<total>\S+) total,\s+(?<free>\S+) free,\s+(?<used>\S+) used,\s+(?<cache>\S+) buff/;

  const {
    groups: { total, free, used, cache }
  } = output.match(regex);

  return { total, free, used, cache };
}

module.exports = { formatted };

const fs = require('fs');
const path = require('path');
const util = require('util');
const psList = require('ps-list');

const exec = util.promisify(require('child_process').exec);

async function raw() {
  const { stdout } = await exec('top -n1 -b');

  log(stdout);

  return stdout;
}

async function formatted() {
  const output = await raw();

  const json = {
    memory: {
      status: await memory(output),
    },
    process: {
      status: await processStatus(output),
      list: await processList(output),
      // list: await psList(),
    },
  };

  return json;
}

async function log(output) {
  const logPath = path.resolve(__dirname, 'top.log');
  let content;

  try {
    content = fs.readFileSync(logPath);
  } catch (error) {
    content = '';
  }

  const time = new Date().toISOString();

  content = `${content}\n>>> ${time}\n${output}`;

  fs.writeFileSync(logPath, content);
}

async function memory(output) {
  const regex = /\s+(?<total>\S+) total,\s+(?<free>\S+) free,\s+(?<used>\S+) used,\s+(?<cache>\S+) buff/;

  const {
    groups: { total, free, used, cache },
  } = output.match(regex);

  return { total, free, used, cache };
}

async function processStatus(output) {
  const regex = /Tasks:\s+(\d+) total,\s+(\d+) running,\s+(\d+) sleeping,\s+(\d+) stopped,\s+(\d+) zombie/;

  const [_, total, running, sleeping, stopped, zombie] = output.match(regex);

  return { total, running, sleeping, stopped, zombie };
}

async function processList(output) {
  const list = [];

  const regex = /(?<pid>\d+)\s+(?<user>\S+)\s+(?<pr>\d+)\s+(?<ni>\d+)\s+(?<virt>\d+)\s+(?<res>\d+)\s+(?<shr>\d+)\s+(?<s>\S+)\s+(?<cpu>\S+)\s+(?<mem>\S+)\s+(?<time>\S+)\s+(?<command>\S+)/g;

  while ((match = regex.exec(output))) {
    const {
      groups: { pid, user, pr, ni, virt, res, shr, s, cpu, mem, time, command },
    } = match;

    const p = { pid, user, pr, ni, virt, res, shr, s, cpu, mem, time, command };

    list.push(p);
  }

  return list;
}

module.exports = { raw, formatted };

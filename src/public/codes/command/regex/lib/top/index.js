const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function log() {
  const { stdout } = await exec('top -n1 -b');
  const logPath = path.resolve(__dirname, 'top.log');
  let content;

  try {
    content = fs.readFileSync(logPath);
  } catch (error) {
    content = '';
  }

  const time = new Date().toISOString();

  content = `${content}\n>>> ${time}\n${stdout}`;

  fs.writeFileSync(logPath, content);
}

async function process() {
  const { stdout } = await exec('top -n1 -b');

  const regex = /Tasks:\s+(\d+) total,\s+(\d+) running,\s+(\d+) sleeping,\s+(\d+) stopped,\s+(\d+) zombie/;

  const [_, total, running, sleeping, stopped, zombie] = stdout.match(regex);

  const status = { total, running, sleeping, stopped, zombie };

  return status;
}

async function memory() {
  const { stdout } = await exec('top -n1 -b');

  const regex = /\s+(?<total>\S+) total,\s+(?<free>\S+) free,\s+(?<used>\S+) used,\s+(?<cache>\S+) buff/;

  const {
    groups: { total, free, used, cache },
  } = stdout.match(regex);

  return { total, free, used, cache };
}

module.exports = { process, memory, log };

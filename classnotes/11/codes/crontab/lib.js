const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function initCron() {
  await exec('echo "" | crontab -');
}

async function addTask(minutes, hours, days, months, weekday, command) {
  const task = `${minutes} ${hours} ${days} ${months} ${weekday} ${command}`;

  await exec(`crontab -l | { cat; echo "${task}"; } | crontab -`);
}

async function listTask() {
  try {
    const { stdout } = await exec('crontab -l');

    return stdout;
  } catch (error) {
    initCron();

    return '';
  }
}

module.exports = { addTask, listTask };

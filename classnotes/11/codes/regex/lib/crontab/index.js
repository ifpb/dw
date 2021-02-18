const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function initCron() {
  await exec('echo "" | crontab -');
}

async function addTask(minutes, hours, days, months, weekday, command) {
  const task = days
    ? `${minutes} ${hours} ${days} ${months} ${weekday} ${command}`
    : `${minutes} ${hours}`;

  await exec(`crontab -l | { cat; echo "${task}"; } | crontab -`);
}

async function listTask() {
  try {
    const { stdout } = await exec('crontab -l');

    return parse(stdout);
  } catch (error) {
    initCron();

    return [];
  }
}

function parse(crontab) {
  const tasks = [];

  for (const task of crontab.split('\n')) {
    if (task) {
      if (/(@yearly|@monthly|@daily|@reboot)/.test(task)) {
        const regex = /(?<frequency>@yearly|@monthly|@daily|@reboot) (?<command>.+)/;

        const {
          groups: { frequency, command },
        } = task.match(regex);

        tasks.push({ frequency, command });
      } else {
        const regex = /(?<minutes>\S+) (?<hours>\S+) (?<days>\S+) (?<months>\S+) (?<weekday>\S+) (?<command>.+)/;

        const {
          groups: { minutes, hours, days, months, weekday, command },
        } = task.match(regex);

        tasks.push({
          frequency: { minutes, hours, days, months, weekday },
          command,
        });
      }
    }
  }

  return tasks;
}

module.exports = { addTask, listTask };

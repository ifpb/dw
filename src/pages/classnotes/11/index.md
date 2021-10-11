# Construção de Backend

## Chamada de Sistema

```text
top - 13:40:37 up 21:04,  0 users,  load average: 0.22, 0.06, 0.02
Tasks:   3 total,   1 running,   2 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.5 sy,  0.0 ni, 99.2 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  2039264 total,   711600 free,   272732 used,  1054932 buff/cache
KiB Swap:  1048572 total,  1048572 free,        0 used.  1643808 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
    1 root      20   0  325052  30512  25240 S   0.0  1.5   0:00.19 node
   15 root      20   0    4280    740    672 S   0.0  0.0   0:00.00 sh
   16 root      20   0   40908   3056   2676 R   0.0  0.1   0:00.00 top
```

main.js:

```js
const top = require('./lib');

(async () => {
  console.log(await top.raw());
})();
```

lib.js:
```js
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function raw() {
  const { stdout } = await exec('top -n1 -b');

  return stdout;
}
```

## Manipulação de arquivo

top.log:

```text
>>> 2020-10-27T01:46:39.716Z
top - 01:46:39 up  9:09,  0 users,  load average: 0.08, 0.03, 0.01
Tasks:   3 total,   1 running,   2 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.5 us,  0.6 sy,  0.0 ni, 98.8 id,  0.1 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  2039264 total,   832868 free,   261920 used,   944476 buff/cache
KiB Swap:  1048572 total,  1048572 free,        0 used.  1655240 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
    1 root      20   0  325068  30488  25036 S   0.0  1.5   0:00.37 node
   17 root      20   0    4280    756    688 S   0.0  0.0   0:00.00 sh
   18 root      20   0   40908   3072   2688 R   0.0  0.2   0:00.00 top

>>> 2020-10-27T01:46:52.286Z
top - 01:46:52 up  9:09,  0 users,  load average: 0.07, 0.03, 0.00
Tasks:   3 total,   1 running,   2 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.5 us,  0.6 sy,  0.0 ni, 98.8 id,  0.1 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  2039264 total,   831860 free,   262572 used,   944832 buff/cache
KiB Swap:  1048572 total,  1048572 free,        0 used.  1654512 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
    1 root      20   0  325068  30632  25192 S   0.0  1.5   0:00.15 node
   17 root      20   0    4280    756    688 S   0.0  0.0   0:00.00 sh
   18 root      20   0   40908   3052   2676 R   0.0  0.1   0:00.00 top

```

lib.js:

```js
const fs = require('fs');
const path = require('path');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function raw() {
  const { stdout } = await exec('top -n1 -b');

  log(stdout);

  return stdout;
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
```

## Expressão Regular

```json
{
  "memory": {
    "status": {
      "total": "2039264",
      "free": "716540",
      "used": "270400",
      "cache": "1052324"
    }
  },
  "process": {
    "status": {
      "total": "3",
      "running": "1",
      "sleeping": "2",
      "stopped": "0",
      "zombie": "0"
    },
    "list": [
      {
        "pid": "1",
        "user": "root",
        "pr": "20",
        "ni": "0",
        "virt": "325052",
        "res": "30612",
        "shr": "25320",
        "s": "S",
        "cpu": "0.0",
        "mem": "1.5",
        "time": "0:00.21",
        "command": "node"
      },
      ...
    ]
  }
}
```

[regex 101](https://regex101.com/):

```js
// memory (status)
/\s+(?<total>\S+) total,\s+(?<free>\S+) free,\s+(?<used>\S+) used,\s+(?<cache>\S+) buff/

// process (status)
/Tasks:\s+(\d+) total,\s+(\d+) running,\s+(\d+) sleeping,\s+(\d+) stopped,\s+(\d+) zombie/

// process (list)
/(?<pid>\d+)\s+(?<user>\S+)\s+(?<pr>\d+)\s+(?<ni>\d+)\s+(?<virt>\d+)\s+(?<res>\d+)\s+(?<shr>\d+)\s+(?<s>\S+)\s+(?<cpu>\S+)\s+(?<mem>\S+)\s+(?<time>\S+)\s+(?<command>\S+)/g
```

main.js:

```js
const top = require('./lib');

(async () => {
  console.log(JSON.stringify(await top.formatted(), null, 2));
})();
```

lib.js:

```js
async function formatted() {
  const output = await raw();

  const json = {
    memory: {
      status: await memory(output),
    },
    process: {
      status: await processStatus(output),
      list: await processList(output),
    },
  };

  return json;
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
```

## Pacotes do NPM

```json
{
  "memory": {
    "status": {
      "total": "2039264",
      "free": "711072",
      "used": "272752",
      "cache": "1055440"
    }
  },
  "process": {
    "status": {
      "total": "3",
      "running": "1",
      "sleeping": "2",
      "stopped": "0",
      "zombie": "0"
    },
    "list": [
      {
        "pid": 1,
        "ppid": 0,
        "uid": 0,
        "cpu": 18,
        "memory": 1.4,
        "name": "node",
        "cmd": "node main.js"
      },
      ...
    ]
  }
}
```

[ps-list](https://github.com/sindresorhus/ps-list):

```bash
$ npm init -y
$ npm install ps-list
```

src/lib.js:

```js
const psList = require('ps-list');

async function formatted() {
  const output = await raw();

  const json = {
    memory: {
      status: await memory(output),
    },
    process: {
      status: await processStatus(output),
      list: await psList(),
    },
  };

  return json;
}
```

## Ativando Rotas

[![Edit top-app](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/top-app-vyldr?fontsize=14&hidenavigation=1&theme=dark)

![](/imgs/command/top-express.png)

src/index.js:

```js
const express = require('express');
const top = require('./lib');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const topOutput = await top.formatted();

  res.json(topOutput);
});

app.listen(port, () => {
  console.log(`Top App at http://localhost:${port}`);
});
```

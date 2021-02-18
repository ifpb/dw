const util = require("util");

const exec = util.promisify(require("child_process").exec);

async function ping(host, count = 1) {
  let ping = {};

  try {
    const command = `ping -c${count} ${host}`;

    const { stdout } = await exec(command);

    ping = parse(stdout);
  } catch (error) {
    ping.error = "Unknown host";
  }

  ping.host = host;

  return ping;
}

function parse(output) {
  const ping = {};

  // ip
  let regex = /\(([\d\.]+)\)/;
  let match = output.match(regex);
  ping.ip = match[1];

  // packets
  ping.packets = [];
  regex = /icmp_seq=(?<seq>\d+) ttl=(?<ttl>\d+) time=(?<time>[\d\.]+)/g;
  while ((match = regex.exec(output))) {
    const {
      groups: { seq, ttl, time }
    } = match;

    ping.packets.push({
      seq: parseInt(seq),
      ttl: parseInt(ttl),
      time: parseFloat(time)
    });
  }

  // statistics
  regex = /(?<transmitted>\d+) packets transmitted, (?<received>\d+) (packets received|received)/;
  const {
    groups: { transmitted, received }
  } = output.match(regex);
  const losted = transmitted - received;

  regex = /min\/avg\/max\/(stddev|mdev) = (?<min>[\d.]+)\/(?<avg>[\d.]+)\/(?<max>[\d.]+)\/(?<stddev>[\d.]+)/;
  const {
    groups: { min, avg, max, stddev }
  } = output.match(regex);

  ping.statistics = {
    transmitted: parseInt(transmitted),
    received: parseInt(transmitted),
    losted: losted,
    min: parseFloat(min),
    avg: parseFloat(avg),
    max: parseFloat(max),
    stddev: parseFloat(stddev)
  };

  return ping;
}

module.exports = { ping };

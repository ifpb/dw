import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

async function pingTimes(host, count) {
  const times = [];

  const command = `ping -c ${count} ${host}`;

  console.log(`COMMAND ${command}`);

  try {
    const { stdout: result } = await execAsync(command);

    const pattern = /time=(?<time>[\d\.]+) ms/g;

    for (const match of result.matchAll(pattern)) {
      const {
        groups: { time }
      } = match;

      times.push({
        time: Number(time)
      });
    }

    return times;
  } catch (e) {
    if (e.stdout.includes("100% packet loss")) {
      throw new Error("Host with 100% packet loss");
    }

    if (e.stdout.includes("Name or service not known")) {
      throw new Error("Host with name or service not known");
    }

    throw new Error("Error in ping");
  }
}

export { pingTimes };

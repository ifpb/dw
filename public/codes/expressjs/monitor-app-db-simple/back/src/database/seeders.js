import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Host from '../models/Hosts.js';

async function up() {
  const file = resolve('src', 'database', 'seeders.json');

  const seed = JSON.parse(readFileSync(file));

  for (const host of seed.hosts) {
    await Host.create(host);
  }
}

export default { up };

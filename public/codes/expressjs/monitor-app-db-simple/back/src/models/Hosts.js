import Database from '../database/database.js';

async function create({ name, address }) {
  if (!name || !address) {
    throw new Error('Error when passing parameters');
  }

  const db = await Database.connect();

  const sql = `
      INSERT INTO
        hosts (name, address)
      VALUES
        (?, ?)
    `;

  const { lastID } = await db.run(sql, [name, address]);

  db.close();

  return await readById(lastID);
}

async function read(field, value) {
  const db = await Database.connect();

  if (field && value) {
    const sql = `
      SELECT
          *
        FROM
          hosts
        WHERE
          ${field} = '?'
      `;

    const hosts = await db.all(sql, [value]);

    db.close();

    return hosts;
  }

  const sql = `
    SELECT
      *
    FROM
      hosts
  `;

  const hosts = await db.all(sql);

  db.close();

  return hosts;
}

async function readById(id) {
  if (!id) {
    throw new Error('Unable to find host');
  }

  const db = await Database.connect();

  const sql = `
      SELECT
          *
        FROM
          hosts
        WHERE
          id = ?
      `;

  const host = await db.get(sql, [id]);

  db.close();

  if (host) {
    return host;
  } else {
    throw new Error('Host not found');
  }
}

async function update({ id, name, address }) {
  if (!name || !address || !id) {
    throw new Error('Error when passing parameters');
  }

  const db = await Database.connect();

  const sql = `
      UPDATE
        hosts
      SET
        name = ?, address = ?
      WHERE
        id = ?
    `;

  const { changes } = await db.run(sql, [name, address, id]);

  db.close();

  if (changes === 1) {
    return readById(id);
  } else {
    throw new Error('Host not found');
  }
}

async function remove(id) {
  if (!id) {
    throw new Error('Unable to find host');
  }

  const db = await Database.connect();

  const sql = `
    DELETE FROM
      hosts
    WHERE
      id = ?
  `;

  const { changes } = await db.run(sql, [id]);

  db.close();

  if (changes === 1) {
    return true;
  } else {
    throw new Error('Host not found');
  }
}

export default { create, read, readById, update, remove };

const { conn } = require("../db");

async function create(data) {
  const sql = `
  INSERT INTO
    logs (total, free, used, cache)
  VALUES
    (?, ?, ?, ?)
  `;

  const db = await conn();

  const { total, free, used, cache } = data;

  const { lastID } = await db.run(sql, [total, free, used, cache]);

  return lastID;
}

async function readAll() {
  const sql = `
    SELECT
      *
    FROM
      logs
  `;

  const db = await conn();

  const foods = await db.all(sql);

  return foods;
}

module.exports = { create, readAll };

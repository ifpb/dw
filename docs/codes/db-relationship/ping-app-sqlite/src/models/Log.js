const { conn } = require("../db");

async function create(data) {
  const sql = `
  INSERT INTO
    logs (transmitted, received, time, host_id)
  VALUES
    (?, ?, ?, ?)
  `;

  const db = await conn();

  const { transmitted, received, time, host_id } = data;

  const { lastID } = await db.run(sql, [transmitted, received, time, host_id]);

  return lastID;
}

module.exports = { create };

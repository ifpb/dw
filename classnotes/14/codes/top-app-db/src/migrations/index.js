const { conn } = require("../db");

async function up() {
  const sql = `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total DOUBLE,
      free DOUBLE,
      used DOUBLE,
      cache DOUBLE
    )
  `;

  const db = await conn();

  await db.run(sql);
}

async function down() {
  const sql = `DROP TABLE logs`;

  const db = await conn();

  await db.run(sql);
}

module.exports = { up, down };

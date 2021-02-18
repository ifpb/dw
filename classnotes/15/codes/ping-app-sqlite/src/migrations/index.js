const { conn } = require("../db");

async function up() {
  const db = await conn();

  await db.run(`
    CREATE TABLE hosts (
      id integer PRIMARY KEY AUTOINCREMENT,
      name text,
      address text
    )
  `);

  await db.run(`
    CREATE TABLE logs (
      id integer PRIMARY KEY AUTOINCREMENT,
      transmitted integer,
      received integer,
      time text,
      host_id integer,
      FOREIGN KEY (host_id) REFERENCES hosts (id)
    )
  `);
}

async function down() {
  const db = await conn();

  await db.run("DROP TABLE logs");

  await db.run("DROP TABLE hosts");
}

module.exports = { up, down };

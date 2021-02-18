const Host = require("../models/Host");

const index = async (req, res) => {
  const hosts = await Host.readAll();

  res.json(hosts);
};

const readAllWithLogs = async (req, res) => {
  const hosts = await Host.readAllWithLogs();

  res.json(hosts);
};

module.exports = { index, readAllWithLogs };

const top = require("../utils/top");
const Log = require("../models/Log");

const index = async (req, res) => {
  const logs = await Log.readAll();

  res.json(logs);
};

const create = async (req, res) => {
  const topFormatted = await top.formatted();

  await Log.create(topFormatted.memory);

  res.json(topFormatted);
};

module.exports = { index, create };

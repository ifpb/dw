const { ping } = require("../utils/ping");
const Host = require("../models/Host");
const Log = require("../models/Log");

const create = async (req, res) => {
  const { host, count } = req.params;

  const pingResult = await ping(host, count);

  const hostValue = {
    name: pingResult.host,
    address: pingResult.ip
  };

  const hosts = await Host.readByNameAddress(pingResult.host, pingResult.ip);

  const host_id = hosts[0] ? hosts[0].id : await Host.create(hostValue);

  const logValue = {
    transmitted: pingResult.statistics.transmitted,
    received: pingResult.statistics.received,
    time: Date.now(),
    host_id
  };

  await Log.create(logValue);

  return res.json(pingResult);
};

module.exports = { create };

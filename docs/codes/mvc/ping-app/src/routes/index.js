import express from "express";

import { pingTimes } from "../lib/ping.js";
import Host from "../models/hosts.js";

const router = express.Router();

router.get("/home", (req, res) => {
  const hosts = Host.readAll();

  res.render("home", { hosts });
});

router.get("/hosts", (req, res) => {
  res.json(Host.readAll());
});

router.post("/hosts", (req, res) => {
  const { name, address, mask } = req.body;

  const host = Host.create({ name, address, mask });

  res.json(host);
});

router.post("/hosts/create", (req, res) => {
  const { name, address, mask } = req.body;

  Host.create({ name, address, mask });

  res.redirect("/home");
});

router.get("/hosts/:hostId/times", async (req, res) => {
  const count = req.query.count || 3;

  const hostId = Number(req.params.hostId);

  const host = Host.read(hostId);

  const times = await pingTimes(host.address, count);

  res.json(times);
});

export { router };

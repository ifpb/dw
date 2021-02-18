const express = require("express");
const router = express.Router();
const PingController = require("../controllers/pingController");
const HostController = require("../controllers/hostController");

router.get("/hosts", HostController.index);
router.get("/hosts/logs", HostController.readAllWithLogs);
router.get("/ping/:host/:count", PingController.create);

module.exports = router;

const express = require("express");
const router = express.Router();
const TopController = require("../controllers/topController");

router.get("/", (req, res) => res.redirect("/process/index"));
router.get("/top", TopController.index);
router.get("/top/read", TopController.create);

module.exports = router;

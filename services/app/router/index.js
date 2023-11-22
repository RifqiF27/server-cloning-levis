const express = require("express");
const router = express.Router();
const admin = require("./admin");
const user = require("./user");

router.use("/pub", user);
router.use(admin);

module.exports = router;

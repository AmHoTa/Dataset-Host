const express = require("express");

const router = express.Router();

const { getOwner } = require("../controller/owners.js");

router.route("/owners").get(getOwner);

module.exports = router;

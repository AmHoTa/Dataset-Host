const express = require("express");

const router = express.Router();

const { getOwner } = require("../controller/owners.js");

router.route("/owners").post(getOwner);

module.exports = router;

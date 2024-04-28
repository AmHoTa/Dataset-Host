const express = require("express");
let { visitors } = require("../app");

const router = express.Router();

const {
  sendImage,
  sendImagesIndexes,
  sendDirs,
} = require("../controller/images");

visitors++;
console.log(`Visitors: ${visitors}`);

router.route("/").get(sendDirs);
router.route("/:folder").get(sendImagesIndexes);
router.route("/:folder/:imgName").get(sendImage);

module.exports = router;

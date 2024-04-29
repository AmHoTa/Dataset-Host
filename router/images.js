const express = require("express");

const router = express.Router();

const {
  sendImage,
  sendImagesIndexes,
  sendDirs,
} = require("../controller/images");

router.route("/").get(sendDirs);
router.route("/:folder").get(sendImagesIndexes);
router.route("/:folder/:imgName").get(sendImage);

module.exports = router;

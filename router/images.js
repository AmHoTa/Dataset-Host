const express = require("express");

const router = express.Router();

const {
  sendImage,
  sendImagesIndexes,
  sendDirs,
  sendReferences,
  sendReferenceIndexes,
} = require("../controller/images");

router.route("/").get(sendDirs);
router.route("/references").get(sendReferences);
router.route("/references/:folder").get(sendReferenceIndexes);
router.route("/:folder").get(sendImagesIndexes);
router.route("/:folder/:imgName").get(sendImage);

module.exports = router;

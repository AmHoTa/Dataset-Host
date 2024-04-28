const express = require("express");
require("dotenv").config();

const imageRouter = require("./router/images");
const errorHanlder = require("./handlers/error-handler");

const app = express();

app.use("/images", imageRouter);

app.use(errorHanlder);

app.listen(
  process.env.PORT,
  console.log(
    `Server is Listening on http://${process.env.DOMAIN}:${process.env.PORT}`
  )
);

let visitors = 0;
module.exports = { visitors };

const express = require("express");
require("dotenv").config();

const imageRouter = require("./router/images");
const ownerRouter = require("./router/owners");
const errorHanlder = require("./handlers/error-handler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", imageRouter);
app.use("/submit", ownerRouter);

app.use(errorHanlder);

app.listen(
  process.env.PORT,
  console.log(
    `Server is Listening on http://${process.env.DOMAIN}:${process.env.PORT}`
  )
);

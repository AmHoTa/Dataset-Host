const express = require("express");
require("dotenv").config();

const imageRouter = require("./router/images");
const ownerRouter = require("./router/owners");
const errorHanlder = require("./handlers/error-handler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const header = `<h1><a href="/images"> All Folders of Images </a></h1>`;
  const body = `<hr> <h2> Notes: </h2>`;
  const page = header + body;
  console.log(page);
  res.send(page);
});
app.use("/images", imageRouter);
app.use(ownerRouter);

app.use(errorHanlder);

app.listen(
  process.env.PORT,
  console.log(
    `Server is Listening on http://${process.env.DOMAIN}:${process.env.PORT}`
  )
);

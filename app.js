const express = require("express");

const imageRouter = require("./router/images");
const errorHanlder = require("./handlers/error-handler");
const { port } = require("./controller/images");

const app = express();

app.use("/images", imageRouter);

app.use(errorHanlder);

app.listen(port, console.log(`Server is Listening on Port ${port}`));

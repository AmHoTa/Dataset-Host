const { dir } = require("console");
const { response } = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const domain = process.env.DOMAIN;
const port = process.env.PORT;

const dataSetPath = path.resolve(process.env.DATASET_PATH);

const sendImagesIndexes = async (req, res, next) => {
  try {
    console.log("Folder");
    const { folder } = req.params;
    const imgFolder = path.resolve(path.join(dataSetPath, folder));

    const images = fs.readdirSync(imgFolder);

    let response = `<h1> All Images in Directory /images/${folder}</h1> index:Name <br>`;
    let urls = "";

    for (let imgIndex in images) {
      console.log(images[imgIndex]);
      const li = `<h4> ${imgIndex}: ${images[imgIndex]} </h4>`;
      const url = `
      <h3> 
      <a href="http://${domain}:${port}/images/${folder}/${images[imgIndex]}">
      
      http://${domain}:${port}/images/${folder}/${images[imgIndex]}</a>
      
      </h3>`;
      urls += url;
      response += li;
    }

    response += `
    <h2> How To Download images:
    https://${domain}:${port}/images/directoryIndex/imageIndex </h2><hr>`;

    response += urls;
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const sendImage = async (req, res, next) => {
  try {
    console.log("Index");
    const { folder, imgName } = req.params;
    console.log(req.params);
    const imgFolder = path.resolve(path.join(dataSetPath, folder));

    const imgPath = path.join(imgFolder, imgName);
    res.setHeader("content-type", "image/png");
    res.sendFile(imgPath);
  } catch (err) {
    next(err);
  }
};

const sendDirs = async (req, res, next) => {
  try {
    let dirs = fs.readdirSync(dataSetPath);
    dirs = dirs
      .map((dir) => Number(dir))
      .sort((a, b) => {
        if (a < b) return -1;
        if (a == b) return 0;
        return 1;
      });

    let response = `<h1> All Directories </h1>`;

    for (let dir of dirs) {
      response += `<h5> <a href="http://${domain}:${port}/images/${dir}"> http://${domain}:${port}/images/${dir} </a> </h5>`;
    }

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { sendImagesIndexes, sendImage, sendDirs };

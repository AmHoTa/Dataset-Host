const { dir } = require("console");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
owners = require("../owners.json");

const domain = process.env.DOMAIN;
const port = process.env.PORT;

const dataSetPath = path.resolve(process.env.DATASET_PATH);

const sendImagesIndexes = async (req, res, next) => {
  try {
    const { folder } = req.params;
    const imgFolder = path.resolve(path.join(dataSetPath, folder));
    const images = fs.readdirSync(imgFolder);

    let response = `<h1> Folder ${folder} Items: </h1>`;
    let urls = "";
    let owner = undefined;
    let form = undefined;

    for (let imgIndex in images) {
      const imgName = images[imgIndex];
      if (imgName in owners) {
        owner = owners[imgName];
      } else {
        form = `<form action="/images/owners"> <input type="text" placeholder="Name" name="${imgName}"> <input type="submit"> </form>`;
      }

      const li = `<h3> Picture ${Number(imgIndex) + 1}: ${images[imgIndex]} - ${
        owner || form
      }  </h3>`;
      const url = `
      <h3>
      <a href="http://${domain}:${port}/images/${folder}/${images[imgIndex]}">
      http://${domain}:${port}/images/${folder}/${images[imgIndex]}</a>
      </h3>`;
      urls += url;
      response += li;
    }

    response = response + "<hr><h1> URLs: </h1>" + urls;
    res.send(response);
  } catch (err) {
    next(err);
  }
};

const sendImage = async (req, res, next) => {
  try {
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
    let pic_count = 0;
    for (let dir of dirs) {
      response += `<h5> <a href="http://${domain}:${port}/images/${dir}"> Folder ${pic_count}</a> </h5>`;
      pic_count++;
    }

    labels = `
    <hr>
    

<pre>
<b>Labels                    RGB Values</b>
Background/Clutter        (0,0,0)
Building                  (128,0,0)
Road                      (128,64,128)
Tree                      (0,128,0)
Low Vegetation            (128,128,0)
Car                       (192,0,192)
Human                     (64,64,0)
Wall                      Soon - News !
Truck                     Soon - News !
</pre>
  `;

    response += labels;

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { sendImagesIndexes, sendImage, sendDirs };

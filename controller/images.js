const { dir } = require("console");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const domain = process.env.DOMAIN;
const port = process.env.PORT;

const dataSetPath = path.resolve(process.env.DATASET_PATH);

const sendImagesIndexes = async (req, res, next) => {
  try {
    let owners = fs.readFileSync("owners.json");
    owners = JSON.parse(owners);
    const { folder } = req.params;
    const imgFolder = path.resolve(path.join(dataSetPath, folder));
    const images = fs.readdirSync(imgFolder);

    let response = `<h1> Folder ${folder} Items: </h1>`;
    let urls = "";

    for (let imgIndex in images) {
      const imgName = images[imgIndex];

      const owner = owners.find(
        (ownerObj) => Object.keys(ownerObj)[0] === imgName
      );

      let form = undefined;
      let li = undefined;

      if (!owner) {
        form = `<form action="/owners"> <input type="text" required placeholder="Name" name="${imgName}"> <input type="submit"> </form>`;
        li = `<h3> Picture ${Number(imgIndex) + 1}: ${
          images[imgIndex]
        } - ${form}</h3>`;
      } else {
        li = `<h3> Picture ${Number(imgIndex) + 1}: ${
          images[imgIndex]
        } --- ${Object.values(owner)}</h3>`;
      }
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
      .map((dir) => {
        if (!isNaN(Number(dir))) {
          return Number(dir);
        } else {
          return dir;
        }
      })
      .sort((a, b) => {
        console.log(a, b);
        if (a < b) return -1;
        if (a == b) return 0;
        return 1;
      });

    let response = `<h1> All Directories </h1>`;

    for (let dir of dirs) {
      response += `<h5> <a href="http://${domain}:${port}/images/${dir}"> Folder - ${dir}</a> </h5>`;
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
Wall                      (74, 144, 226)
Truck                     (80, 227, 194)
</pre>

  `;

    response += labels;

    res.send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { sendImagesIndexes, sendImage, sendDirs };

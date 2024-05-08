const fs = require("fs");

let owners = require("../owners.json");

const getOwner = (req, res, next) => {
  owners = [...owners, req.query];
  fs.writeFileSync("owners.json", JSON.stringify(owners, null, 2), {
    encoding: "",
  });
  res.redirect("/images");
};

module.exports = { getOwner };

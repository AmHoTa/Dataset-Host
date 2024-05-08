const getOwner = (req, res, next) => {
  console.log("In getOwner");
  console.log(req.body);
};

module.exports = { getOwner };

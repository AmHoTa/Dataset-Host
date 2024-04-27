const errorHanlder = (err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .send(
      `<h1> Something Went Wrong. Make sure you provide the given url </h1> <h2><a href="/images"> HELP </a></h2> `
    );
};

module.exports = errorHanlder;

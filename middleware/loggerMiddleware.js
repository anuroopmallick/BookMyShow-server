module.exports = function (req, res, next) {
  /************************learner code ************************/
  // Here goes the learner's code
  console.log(`${new Date().toISOString()} | ${req.method} request received`);
  next();

  // Once the response is finished
  // res.on('finish', () => {
  //     const duration = Date.now() - start;
  //     console.log(
  //       `${new Date().toISOString()} | ${req.method} ${req.url} | ${res.statusCode} | ${duration}ms`
  //     );
  //   });

  // next();
};

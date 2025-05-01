module.exports = function (req, res, next) {
  console.log(`${new Date().toISOString()} | ${req.method} | ${req.url} `);
  next();
  // res.on('finish', () => {
  //     const duration = Date.now() - start;
  //     console.log(
  //       `${new Date().toISOString()} | ${req.method} ${req.url} | ${res.statusCode} | ${duration}ms`
  //     );
  //   });

  // next();
};

module.exports = function(model, query) {
  return new Promise((resolve, reject) => {
    model.findOne(query, (err, result) => {
      if (err || result === null) {
        reject(new Error("Internal server error."));
      } else {
        resolve(result);
      }
    });
  });
};

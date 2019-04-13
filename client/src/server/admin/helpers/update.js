module.exports = function(model, target, query) {
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate(target, query, (err, result) => {
      if (err || result === null) {
        reject(new Error("Internal server error."));
      } else {
        resolve(result);
      }
    });
  });
};

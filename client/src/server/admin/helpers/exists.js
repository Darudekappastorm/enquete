module.exports = function(model, query) {
  return new Promise((resolve, reject) => {
    model.findOne(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result !== null);
      }
    });
  });
};

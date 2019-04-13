const jwt = require("jsonwebtoken");
const CONFIG = require("../admin/config/config.json");

module.exports = function(req, res) {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ errors: [{ message: "JWT token not provided" }] });
  }

  return jwt.verify(token, CONFIG.database.secret, (err, data) => {
    if (err) {
      return res.status(403).json({ errors: [{ message: err.message }] });
    }

    return data;
  });
};

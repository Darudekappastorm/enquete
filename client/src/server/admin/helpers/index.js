const exists = require("./exists");
const sanitizeAccount = require("./sanitize-account");
const validateEmail = require("./validate-email");
const findOne = require("./find-one");
const update = require("./update.js");

module.exports = {
  exists,
  sanitizeAccount,
  validateEmail,
  findOne,
  update
};

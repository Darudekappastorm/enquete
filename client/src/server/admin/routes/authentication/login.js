const CONFIG = require("../../config/config.json");

const {
  findOne,
  exists,
  validateEmail,
  sanitizeAccount
} = require("../../helpers");

const { verifyToken } = require("../../../__globalHelpers/index");

const PasswordService = require("../../lib/password-service");
const jwt = require("jsonwebtoken");

module.exports = async function(Authentication, req, res) {
  console.log("Login request");
  try {
    const { handle, password, token } = req.body;
    const { Accounts } = Authentication.database.models;

    //Check if user is loggin in with JWT token
    if (req.headers["authorization"]) {
      console.log("Logging in with JWT");
      const result = verifyToken(req, res);

      if (!result.id) {
        return;
      }

      const { username_lower } = result;

      const query = { username_lower };

      //If the account was removed but the JWT token was a valid token display an error
      if (!(await exists(Accounts, query))) {
        return res
          .status(200)
          .json({ errors: [{ message: "Account not found." }] });
      }

      return res.status(200).json({ token: req.headers["authorization"] });
    }

    const query = { username: handle };

    if (!(await exists(Accounts, query))) {
      return res
        .status(200)
        .json({ errors: [{ message: "Account not found." }] });
    }

    const account = await findOne(Accounts, query);
    if (!PasswordService.validate(password, account.password)) {
      return res
        .status(200)
        .json({ errors: [{ message: "Incorrect combination." }] });
    }

    jwt.sign(sanitizeAccount(account), CONFIG.database.secret, (err, token) => {
      if (err) {
        console.log(err);
        throw new Error("Internal server error.");
      }

      return res.status(200).json({
        token: token
      });
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};

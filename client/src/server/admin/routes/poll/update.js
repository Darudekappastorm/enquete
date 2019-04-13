const { exists, update } = require("../../helpers");
const { verifyToken } = require("../../../__globalHelpers/index");

module.exports = async function(Authentication, req, res) {
  console.log("Edit poll request");
  try {
    const { id, command } = req.body;
    const { Polls } = Authentication.database.models;
    const errors = [];

    const result = verifyToken(req, res);

    if (!result.id) {
      return;
    }

    if (!id) {
      errors.push({ message: "ID is required" });
    }

    if (!command) {
      errors.push({ message: "you have to specify a command" });
    }

    if (!(await exists(Polls, { _id: id }))) {
      errors.push({ message: "Poll not found" });
    }

    if (errors.length > 0) {
      return res.status(200).json({ errors });
    }

    Polls.findOneAndUpdate({ _id: id }, { status: command }, (err, result) => {
      if (err) {
        return errors.push({ message: err });
      }

      return res.status(200).send(result);
    });
  } catch (ex) {
    return res.status(200).json({ errors: [{ message: ex.message }] });
  }
};
